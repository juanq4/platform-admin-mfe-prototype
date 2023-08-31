output "s3_bucket" {
  value = aws_s3_bucket.mfe
}

output "aws_iam_role" {
  value = data.aws_iam_session_context.current
}

output "aws_region" {
  value = var.aws_region
}
