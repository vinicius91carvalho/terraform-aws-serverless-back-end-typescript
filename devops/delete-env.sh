#!/bin/bash
# How to use: BRANCH_NAME=sc2002 sh delete-env.sh
cd ..

echo Destroying domain on Route53 for branch API $BRANCH_NAME
sls delete_domain --stage $BRANCH_NAME

echo Destroying APIs and Lambdas
sls remove -v -s $BRANCH_NAME

echo Selecting workspace
cd devops/terraform
# terraform workspace select $BRANCH_NAME
terraform workspace select $BRANCH_NAME

echo Destroying the infrastructure
terraform init
terraform destroy -var-file=dev.tfvars -var="environment=$BRANCH_NAME" -auto-approve

echo Destroying the workspace
# echo Selecting the stage workspace
terraform workspace select stage
# echo Destroying the branch workspace
terraform workspace delete $BRANCH_NAME