# HIPAA Compliance Checklist for MedConcierge

## 1. Technical Safeguards
- [x] **Encryption at Rest**: All photo files are encrypted using AES-256 before storage.
- [ ] **Database Encryption**: Ensure AWS RDS / PostgreSQL has "Encryption at Rest" enabled (Infrastructure Config).
- [x] **Encryption in Transit**: Application served over HTTPS (Requires SSL Cert on Deploy).
- [x] **Audit Controls**: All PHI access events are logged to `audit.log` (In production, pipe to CloudWatch).
- [x] **Access Control**: Admin dashboard requires Authentication (Bearer Token).

## 2. Administrative Safeguards
- [ ] **BAA (Business Associate Agreement)**: Signed with AWS/Cloud Provider?
- [ ] **BAA**: Signed with OpenAI (Enterprise) or Anthropic?
- [ ] **Staff Training**: Is clinic staff trained on not sharing passwords?

## 3. Physical Safeguards
- [ ] **Server Location**: Using compliant cloud regions (e.g., AWS US-East).
- [ ] **Device Security**: No photos stored on local staff devices (browser view only).

## Pre-Launch Validation
1. Rotate the 'admin123' password to a secure environment variable.
2. Enable SSL/TLS on the load balancer.
3. Configure `audit.log` rotation or external shipping.
