resource "aws_s3_bucket" "mfe" {
  bucket        = local.fqdn
  tags          = module.tags.tags
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "mfe" {
  bucket                  = aws_s3_bucket.mfe.id
  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
  ignore_public_acls      = true
}

resource "aws_s3_bucket_policy" "mfe" {
  bucket = aws_s3_bucket.mfe.id
  policy = templatefile("${path.module}/templates/s3_bucket_polices/default.tftpl",
    {
      cloudfront_origin_access_identity = aws_cloudfront_origin_access_identity.mfe.iam_arn,
      s3_bucket_arn                     = aws_s3_bucket.mfe.arn
    })
}

resource "aws_s3_bucket_ownership_controls" "mfe" {
  bucket = aws_s3_bucket.mfe.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "mfe" {
  bucket = aws_s3_bucket.mfe.bucket
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
module "artifact_fetch" {
  source               = "git@github.com:q4mobile/terraform-module-npm-artifact.git//fetch?ref=v0.1.0"
  authentication_token = var.artifact_server_password
  artifact_name        = var.npm_package_name
  artifact_version     = var.npm_package_version
}

module "artifact_deploy" {
  source            = "git@github.com:q4mobile/terraform-module-npm-artifact.git//s3/deploy?ref=v0.1.0"
  source_dir        = module.artifact_fetch.artifact_dir
  package_version   = var.npm_package_version
  package_name      = var.npm_package_name
  environment       = var.environment_type
  deploy_story_book = var.deploy_story_book
  s3_bucket         = aws_s3_bucket.mfe.id

  depends_on = [
    aws_s3_bucket.mfe,
    module.artifact_fetch
  ]
}
