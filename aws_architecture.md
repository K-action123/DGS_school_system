# AWS Free Tier Architecture & Deployment Guide

## Architecture Diagram

```mermaid
graph TD
    User[User] -->|HTTPS| CF[CloudFront CDN]
    
    subgraph AWS Cloud
        CF -->|/ (Static Content)| S3[S3 Bucket (Frontend)]
        CF -->|/api (Dynamic Requests)| EC2[EC2 Instance (Backend)]
        
        subgraph VPC
            EC2 -->|SQL| RDS[RDS PostgreSQL (Database)]
        end
    end
    
    GitHub[GitHub Actions] -->|Build & Sync| S3
    GitLab[GitLab CI] -->|SSH Deploy| EC2
```

## Components
1.  **Frontend (S3 + CloudFront)**:
    -   Your React app is built and files are stored in an S3 bucket.
    -   CloudFront sits in front, providing a secure HTTPS URL (e.g., `d123.cloudfront.net`) and caching content globally.
    -   **Cost**: Free Tier (5GB storage, 1TB transfer).

2.  **Backend (EC2)**:
    -   A single `t2.micro` instance runs Docker.
    -   Your Librarian Portal and other services run as containers here.
    -   CloudFront routes requests starting with `/api` to this instance.
    -   **Cost**: Free Tier (750 hours/month).

3.  **Database (RDS)**:
    -   A managed PostgreSQL database (`db.t3.micro`).
    -   Securely accessible only from your EC2 instance.
    -   **Cost**: Free Tier (750 hours/month, 20GB storage).

## Deployment Instructions

### 1. Prerequisites
-   Install [Terraform](https://developer.hashicorp.com/terraform/downloads).
-   Install [AWS CLI](https://aws.amazon.com/cli/) and run `aws configure`.
-   Create an SSH Key Pair in AWS Console (EC2 -> Key Pairs) named `dgs-key`.

### 2. Provision Infrastructure
1.  Navigate to `terraform/` directory.
2.  Run `terraform init`.
3.  Run `terraform apply`.
    -   Enter a database password when prompted.
    -   Enter `dgs-key` for the key name.
4.  Note the outputs: `website_url`, `ec2_public_ip`, `rds_endpoint`.

### 3. Configure Secrets
You need to store your secrets (API Keys, DB Password) securely.
1.  **GitHub**: Go to Settings -> Secrets and variables -> Actions. Add:
    -   `AWS_ACCESS_KEY_ID`
    -   `AWS_SECRET_ACCESS_KEY`
    -   `CLOUDFRONT_DISTRIBUTION_ID` (get this from AWS Console)
    -   `S3_BUCKET_NAME` (get this from Terraform output or AWS Console)
2.  **GitLab**: Go to Settings -> CI/CD -> Variables. Add:
    -   `EC2_SSH_KEY` (The private key content of `dgs-key.pem`)
    -   `EC2_HOST` (The `ec2_public_ip`)
    -   `DB_PASSWORD`
    -   `GEMINI_API_KEY`

### 4. Deploy
-   **Frontend**: Push to `main` on GitHub. The Action will build and deploy.
    -   *Note*: Yes, any change pushed to GitHub will be automatically built and deployed to the website. This is a full CI/CD pipeline for the frontend.
-   **Backend**: Add the provided `gitlab-ci-snippet.yml` content to your GitLab repository's `.gitlab-ci.yml`.

## Maintenance Mode ("Lightswitch")
To quickly take the site offline for maintenance without destroying infrastructure:

1.  **Prerequisites**: Ensure `aws` CLI is configured and you have the `scripts/toggle_maintenance.sh` script.
2.  **Turn ON Maintenance**:
    ```bash
    export BUCKET_NAME="your-s3-bucket-name"
    export DISTRIBUTION_ID="your-cloudfront-id"
    ./scripts/toggle_maintenance.sh on
    ```
    This swaps your live `index.html` with a maintenance page.
3.  **Turn OFF Maintenance**:
    ```bash
    ./scripts/toggle_maintenance.sh off
    ```
    This restores your original site.

## Cost Monitoring
To ensure you stay in the Free Tier:
1.  Go to **AWS Billing Dashboard**.
2.  Enable **Free Tier Alerts** to get emails if you approach limits.
3.  Check **Cost Explorer** weekly.

