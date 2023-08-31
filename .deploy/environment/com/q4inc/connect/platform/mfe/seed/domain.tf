resource "aws_route53_zone" "mfe" {
  name = local.fqdn
}

data "aws_route53_zone" "platform" {
  provider     = aws.platform
  name         = var.platform_hosted_zone
  private_zone = false
}

resource "aws_route53_record" "mfe_ns_record" {
  provider = aws.platform
  name     = local.fqdn
  zone_id  = data.aws_route53_zone.platform.zone_id
  type     = "NS"
  ttl      = "86400"

  records = [
    aws_route53_zone.mfe.name_servers[0],
    aws_route53_zone.mfe.name_servers[1],
    aws_route53_zone.mfe.name_servers[2],
    aws_route53_zone.mfe.name_servers[3],
  ]
}

resource "aws_route53_record" "cf" {
  count   = length(local.domain_aliases)
  name    = local.domain_aliases[count.index]
  zone_id = aws_route53_zone.mfe.zone_id
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.mfe.domain_name
    zone_id                = aws_cloudfront_distribution.mfe.hosted_zone_id
    evaluate_target_health = true
  }

  depends_on = [aws_s3_bucket.mfe]
}

resource "aws_acm_certificate" "cf_cert" {
  domain_name               = local.fqdn
  subject_alternative_names = var.alternate_domain_aliases
  validation_method         = "DNS"
  tags                      = module.tags.tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cf_cert_validation_records" {
  for_each = {
    for dvo in aws_acm_certificate.cf_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  name            = each.value.name
  records         = [each.value.record]
  type            = each.value.type
  allow_overwrite = true
  zone_id         = aws_route53_zone.mfe.zone_id
  ttl             = 60
}

resource "aws_acm_certificate_validation" "cf_cert_validation" {
  certificate_arn         = aws_acm_certificate.cf_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cf_cert_validation_records : record.fqdn]

  depends_on = [aws_route53_record.cf_cert_validation_records]
}
