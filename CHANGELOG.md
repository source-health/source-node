# Source Client Changelog

## v1.4.0

- Core:
  - Custom Fields API
  - Notification Preferences API
- Scheduling
  - Recurring Slots API
- Clinical:
  - Care Plan API
  - Notes API
  - Note Versions API
  - Encounters API
  - Encounter Types API


## v1.3.0

### New API Features

- Core:
  - Account theme settings
  - Location support, including availability support.
  - Events: intents, license, and location events.
- Forms (pre-release):
  - Changes to form config schema
  - Unarchiving
- Scheduling:
  - Add support for availability-by-location
- Measurements:
  - Use enum for units

### Other Changes

- Add (and document) a workaround for file uploads (see README).

## v1.2.0

### New API Features

- Errors:
  - Add an 'unprocessable_request_error' type.
- Core:
  - Add intents (schedule and form intents, pre-release).
  - Add expandable member to events API.
  - Support Canvas integrations and add member `external_identifiers`
- Communications:
  - Add channels and contact point concepts (work in progress)
- Forms (pre-release):
  - Fix `$neq` operator, should be `$ne`.
  - Changes to config and response API objects.
- Scheduling:
  - Add participant operator
  - Add availability release window

### Other Changes

- Export the 'SourceClient' sub-module in index.ts (makes SourceClient and
  SourceClientOptions types available for import).

## v1.1.1

### Other Changes

- Polyfill `Object.fromEntries` to support older browsers

## v1.1

### New API Features

- Add 'title' and 'suffix' to users
- New member list filter params:
  - care_team
  - enrollment_status
  - region
  - sex_at_birth
  - gender_identity
- New member list sort params

### Backwards Incompatibility Changes

- Member search filter param 'email' becomes an array of email addresses.

## v1.0

### Backwards Incompatible Changes and Deprecations

- Authentication classes have been renamed as they collided with API resources. Note that no changes were made to the behavior of these classes, and only the names were changed. The following changes were made:
  - `ApiKey` -> `ApiKeyAuthentication`
  - `UserKey` -> `UserAuthentication`
  - `Token` -> `JWTAuthentication`
  - `Anonymous` -> `AnonymousAuthentication`
- `CareTeamRole` resource has been removed. Its usage for user categorization can be replaced by Groups, and its usage in task routing can be replaced by Queues.
- `Message` resources can now have a `sender` pointing to an `ApiKey`, in addition to the typical `User` and `Member`.

## v0.27

### New API Features

- Comments
- Appointment Statuses
- Account Branding Logos
- Previous Values for \*.updated events

### Other Changes

- All form question types can now support an optional description

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
