# Source Client Changelog

## v0.27

### Backwards Incompatible Changes and Deprecations

- Not-enrolled members do not require date_of_birth or sex_at_birth, so those fields are now nullable (but will always
  be non-null for enrolled members).
- We have deprecated the `member` option to `source.tokens.generate()`, replacing it with `subject` and `actor` to
  support the new relationships feature. We will maintain backwards compatibility by allowing `member` as an alias
  for `subject`.

### New API Features

- Forms
- Documents
- Relationships
- Tags
- Member enrollment status
- Redacted Messages
- Appointment Reminders
- Per-appointment-type availability rules

### Other Changes

- Add support for generating 'actor' member tokens (for related members like caregivers).
- We have updated the code that generates this SDK to handle two new patterns:
  1.  Endpoints like `/v1/forms/:formId/versions/latest/publish` (nested path using a constant 'latest' instead of a path
      parameter).
  2.  Circular references that can be found in the form conditionals config. Make sure we treat those named OpenAPI schema
      objects as references instead of expanding them inline, which would trigger infinite recursion.
- We have introduced a suite of simple end-to-end tests and are running them in our continuous integration system.
