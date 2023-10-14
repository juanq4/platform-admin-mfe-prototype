resource "aws_cloudfront_distribution" "mfe" {
  enabled             = true
  default_root_object = "index.html"
  aliases             = local.domain_aliases
  comment             = "${local.app_name} CloudFront -> MFE S3 Static website"

  origin {
    origin_id   = "origin-${local.fqdn}"
    domain_name = aws_s3_bucket.mfe.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.mfe.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    target_origin_id         = "origin-${local.fqdn}"
    cache_policy_id          = data.aws_cloudfront_cache_policy.optimized.id
    origin_request_policy_id = data.aws_cloudfront_origin_request_policy.cors_s3.id
    allowed_methods          = ["GET", "HEAD"]
    cached_methods           = ["GET", "HEAD"]
    compress                 = true
    viewer_protocol_policy   = "redirect-to-https"
    min_ttl                  = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = module.tags.tags

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cf_cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  web_acl_id = aws_wafv2_web_acl.rate_limiter.arn

  depends_on = [aws_acm_certificate_validation.cf_cert_validation]
}

data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_origin_request_policy" "cors_s3" {
  name = "Managed-CORS-S3Origin"
}

resource "aws_wafv2_web_acl" "rate_limiter" {
  name        = "wafv2_web_acl-${local.app_name}"
  description = "WAF of a rate based statement."
  scope       = "CLOUDFRONT"

  default_action {
    allow {}
  }

  rule {
    name     = "waf-rule-${local.app_name}-1000"
    priority = 1

    action {
      count {}
    }

    statement {
      rate_based_statement {
        limit              = 1000
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      metric_name                = "waf-rate-limit-${local.app_name}"
      cloudwatch_metrics_enabled = true
      sampled_requests_enabled   = true
    }
  }

  tags =  module.tags.tags

  visibility_config {
    metric_name                = "waf-rate-limit-${local.app_name}"
    cloudwatch_metrics_enabled = true
    sampled_requests_enabled   = true
  }

}

resource "aws_cloudfront_origin_access_identity" "mfe" {
  comment = aws_s3_bucket.mfe.bucket
}
