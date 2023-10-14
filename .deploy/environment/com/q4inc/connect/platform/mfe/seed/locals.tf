locals {
  app_name              = "${var.app_name_prefix}-${var.environment}"
  uppercase_environment = upper(var.environment)
  fqdn                  = "${local.subdomain}${var.hosted_zone}"
  ssm_parameter_prefix   = "${var.environment}/${var.app_name_prefix}"

  //Ideally the downstream modules handle naming conventions and this logic is eventually moved there
  subdomain             = replace(var.subdomain,            "$(ENVIRONMENT)",           var.environment)
  rolename_suffix        = replace(var.rolename_suffix,      "$(UPPERCASE_ENVIRONMENT)", local.uppercase_environment)
  domain_stage          = replace(var.domain_stage,         "$(ENVIRONMENT)",           var.environment)
  domain_aliases        = compact(concat([local.fqdn],var.alternate_domain_aliases))
}