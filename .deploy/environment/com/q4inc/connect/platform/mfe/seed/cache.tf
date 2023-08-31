resource "null_resource" "invalidate_cache" {
  triggers = {
    force_deploy = uuid()
  }
  provisioner "local-exec" {
    command = <<-EOT
      aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.mfe.id} --paths "/*"
    EOT
  }
  depends_on = [
    module.artifact_deploy
  ]
}
