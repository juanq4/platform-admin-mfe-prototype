module "tags" {
  source                 = "github.com/q4mobile/terraform-module-aws-tags-default.git?ref=v1.0.2"
  contact                = var.contact
  environment            = var.environment
  control_repository_url = var.repository_url
  module_repository_url  = var.repository_url
  name                   = var.product_name
  product                = var.product
  sub_product            = var.sub_product
  description            = var.description
}
