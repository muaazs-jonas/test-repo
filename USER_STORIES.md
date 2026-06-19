# Application Tracking System - User Stories

## Story #1: User Can Submit an Application
**Status:** Baseline
**Story Points:** 5
**Priority:** High
**Epic:** Application Submission & Tracking

### Description
As a user, I want to submit an application through the system so that I can apply for positions and have my application tracked.

### Acceptance Criteria

```gherkin
Feature: User Application Submission
  
  Scenario: User successfully submits a complete application
    Given I am a logged-in user on the application submission page
    And I have filled out all required fields:
      | Field              | Value                    |
      | Full Name          | John Doe                 |
      | Email              | john.doe@example.com     |
      | Phone              | +1-555-0123              |
      | Position Applied   | Senior Developer         |
      | Resume File        | resume.pdf               |
      | Cover Letter       | coverletter.docx         |
    When I click the "Submit Application" button
    Then the application should be successfully submitted
    And I should see a confirmation message: "Your application has been submitted successfully"
    And the application status should be set to "Submitted"
    And I should receive a confirmation email
    And my application should be assigned a unique tracking ID
    
  Scenario: User cannot submit application with missing required fields
    Given I am on the application submission page
    And I have filled out the following fields:
      | Field              | Value                    |
      | Full Name          | Jane Smith               |
      | Email              |                          |
      | Position Applied   | Product Manager          |
    When I click the "Submit Application" button
    Then the submission should fail
    And I should see an error message: "Email field is required"
    And the application should not be stored in the system
    
  Scenario: User uploads a file that exceeds the size limit
    Given I am on the application submission page
    And I have filled out all required fields
    And I attempt to upload a resume file larger than 10MB
    When I click the "Submit Application" button
    Then the submission should fail
    And I should see an error message: "File size must not exceed 10MB"
    And the application should not be submitted
    
  Scenario: User sees validation error for invalid email format
    Given I am on the application submission page
    And I have filled in email field with "invalid-email"
    When I click the "Submit Application" button
    Then the submission should fail
    And I should see an error message: "Please enter a valid email address"
```

---

## Story #2: Administrator Can View All Applications with Filtering
**Status:** Baseline
**Story Points:** 8
**Priority:** High
**Epic:** Application Management & Tracking

### Description
As an administrator, I want to view all submitted applications with ability to filter and search so that I can efficiently manage and review applications.

### Acceptance Criteria

```gherkin
Feature: Administrator Application Management Dashboard
  
  Scenario: Administrator views all applications on the dashboard
    Given I am logged in as an administrator
    When I navigate to the Applications Dashboard
    Then I should see a list of all submitted applications
    And the list should display the following columns:
      | Column          | Description                    |
      | Application ID  | Unique tracking ID             |
      | Applicant Name  | Full name of applicant         |
      | Position        | Position applied for           |
      | Submission Date | Date when application was sent |
      | Current Status  | Current application status     |
    And each application should be clickable for detailed view
    
  Scenario: Administrator filters applications by status
    Given I am on the Applications Dashboard
    And the system has 50 total applications with statuses:
      | Status      | Count |
      | Submitted   | 20    |
      | In Review   | 15    |
      | Shortlisted | 10    |
      | Rejected    | 5     |
    When I select the "In Review" filter
    Then the displayed list should show only 15 applications
    And all displayed applications should have status "In Review"
    
  Scenario: Administrator searches applications by applicant name
    Given I am on the Applications Dashboard with 100 applications
    When I enter "John Smith" in the search field
    And I click the "Search" button
    Then the system should display only applications from applicants with "John Smith" in their name
    And the result count should show the number of matching applications
    
  Scenario: Administrator filters applications by date range
    Given I am on the Applications Dashboard
    When I set the date filter from "2026-01-01" to "2026-03-31"
    And I click "Apply Filter"
    Then the list should display only applications submitted within that date range
    And applications outside the date range should not be displayed
    
  Scenario: Administrator sorts applications by submission date
    Given I am viewing the applications list
    When I click the "Submission Date" column header
    Then the applications should be sorted in ascending order by submission date
    When I click the "Submission Date" column header again
    Then the applications should be sorted in descending order
```

---

## Story #3: User Can Track Their Application Status
**Status:** Baseline
**Story Points:** 5
**Priority:** High
**Epic:** Application Submission & Tracking

### Description
As a user, I want to track the status of my submitted application so that I know where my application stands in the review process.

### Acceptance Criteria

```gherkin
Feature: User Application Status Tracking
  
  Scenario: User views their application status using tracking ID
    Given I have submitted an application with tracking ID "APP-2026-001234"
    When I enter the tracking ID "APP-2026-001234" on the Track Application page
    And I click "View Status"
    Then I should see the following application details:
      | Field              | Example Value        |
      | Tracking ID        | APP-2026-001234      |
      | Full Name          | John Doe             |
      | Position Applied   | Senior Developer     |
      | Submission Date    | 2026-06-15           |
      | Current Status     | In Review            |
      | Last Updated       | 2026-06-18 14:30 UTC |
    And the page should show a timeline of status changes
    
  Scenario: User views their application on their profile dashboard
    Given I am logged in as a user
    And I have submitted 3 applications
    When I navigate to "My Applications" section
    Then I should see a list of all my applications with:
      | Column              | Description              |
      | Position            | Position applied for     |
      | Submission Date     | When application sent    |
      | Current Status      | Submitted/In Review/etc  |
      | Last Updated        | Last status update time  |
    And I should be able to click each application to view details
    
  Scenario: User receives notification when application status changes
    Given my application is in "In Review" status
    When an administrator updates my application status to "Shortlisted"
    Then I should receive a notification in the system
    And the notification should display: "Your application for Senior Developer has been shortlisted"
    And I should also receive an email notification
    And the notification should include next steps or action items
    
  Scenario: User cannot view other users' applications
    Given I am logged in as user with ID "USER-001"
    When I attempt to access the application status page for a different user's application
    Then the system should return a 403 Forbidden error
    And I should see a message: "You do not have permission to view this application"
```

---

## Story #4: Administrator Can Update Application Status and Add Comments
**Status:** Baseline
**Story Points:** 8
**Priority:** High
**Epic:** Application Management & Tracking

### Description
As an administrator, I want to update application status and add comments so that I can manage the application review process and provide feedback to applicants.

### Acceptance Criteria

```gherkin
Feature: Administrator Application Status Updates
  
  Scenario: Administrator updates application status
    Given I am an administrator viewing application "APP-2026-001234"
    And the current status is "Submitted"
    When I click on the status dropdown
    And I select "In Review"
    And I click "Update Status"
    Then the application status should be updated to "In Review"
    And the system should record the timestamp of the update
    And the system should record which administrator made the change
    And the applicant should be notified of the status change
    
  Scenario: Administrator adds internal comments to an application
    Given I am viewing application details
    When I click on the "Internal Comments" section
    And I type a comment: "Candidate has relevant experience. Recommend phone screening"
    And I click "Add Comment"
    Then the comment should be saved to the application
    And the comment should display:
      | Field              | Value                                              |
      | Comment Text       | Candidate has relevant experience...               |
      | Added By           | admin@company.com                                  |
      | Timestamp          | Current timestamp                                  |
    And the comment should not be visible to the applicant
    
  Scenario: Administrator rejects an application with reason
    Given I am viewing an application with status "In Review"
    When I click the "Reject Application" button
    And I select rejection reason "Does not meet minimum qualifications"
    And I add optional rejection feedback: "Missing 2 years of required experience"
    And I click "Confirm Rejection"
    Then the application status should be changed to "Rejected"
    And the system should store the rejection reason and timestamp
    And the applicant should receive a rejection notification
    And the rejection feedback should be included in the notification (if provided)
    
  Scenario: Administrator shortlists an application and schedules interview
    Given I am viewing an application with status "In Review"
    When I click "Shortlist Application"
    And I select an interview time slot: "2026-07-01 at 10:00 AM"
    And I choose interviewer: "Jane Smith"
    And I click "Confirm Shortlist and Schedule"
    Then the application status should be updated to "Shortlisted"
    And an interview record should be created with:
      | Field               | Value                |
      | Scheduled Date/Time | 2026-07-01 10:00 AM  |
      | Interviewer         | Jane Smith           |
      | Application ID      | APP-2026-001234      |
    And both the applicant and interviewer should receive notifications
    
  Scenario: Administrator cannot update application status with invalid transition
    Given I am viewing an application with status "Rejected"
    When I attempt to change the status to "Shortlisted"
    Then the system should prevent this action
    And I should see an error message: "Cannot transition from Rejected to Shortlisted status"
```

---

## Story #5: System Sends Notifications for Application Events
**Status:** Baseline
**Story Points:** 8
**Priority:** Medium
**Epic:** Notifications & Communication

### Description
As a system, I want to send notifications to users and administrators for application events so that all stakeholders are kept informed of important changes.

### Acceptance Criteria

```gherkin
Feature: Application Event Notifications
  
  Scenario: User receives email notification when application is submitted
    Given a user has submitted an application with email "john@example.com"
    When the application submission is processed successfully
    Then an email should be sent to "john@example.com"
    And the email should contain:
      | Content                    | Example                     |
      | Subject Line               | Application Confirmation    |
      | Application ID             | APP-2026-001234             |
      | Position Applied For       | Senior Developer            |
      | Submission Date            | 2026-06-19                  |
      | Instructions               | Track your application here |
    And the user should see an in-app notification
    
  Scenario: Administrator receives notification when new application is submitted
    Given an administrator with email "admin@company.com" is set to receive notifications
    When a new application is submitted
    Then a notification should be sent to "admin@company.com"
    And the notification should include:
      | Information        | Example            |
      | Applicant Name     | John Doe           |
      | Position           | Senior Developer   |
      | Application ID     | APP-2026-001234    |
      | View Application   | Direct link        |
    And administrators should see an in-app notification
    
  Scenario: Applicant receives notification of status change
    Given an application status is changed from "Submitted" to "In Review"
    When the status update is saved
    Then the applicant should receive an email notification
    And the notification subject should be: "Update on Your Application for Senior Developer"
    And the notification should include:
      | Content             | Example         |
      | New Status          | In Review       |
      | Position            | Senior Developer|
      | Updated Time        | Current time    |
      | Next Steps          | We are reviewing|
    And the notification should have a link to track the application
    
  Scenario: User can manage notification preferences
    Given I am logged in on my profile settings page
    When I navigate to "Notification Preferences"
    Then I should see toggles for:
      | Notification Type           | Options    |
      | Application Submission      | On/Off     |
      | Status Updates              | On/Off     |
      | Interview Scheduled         | On/Off     |
      | Final Decision              | On/Off     |
    And I should be able to select preferred notification channels:
      | Channel | Available |
      | Email   | Yes       |
      | In-App  | Yes       |
    And changes should be saved when I click "Save Preferences"
```

---

## Story #6: Administrator Can Generate Application Reports
**Status:** Baseline
**Story Points:** 13
**Priority:** Medium
**Epic:** Reporting & Analytics

### Description
As an administrator, I want to generate reports on applications so that I can analyze recruitment metrics and make data-driven decisions.

### Acceptance Criteria

```gherkin
Feature: Application Reporting and Analytics
  
  Scenario: Administrator generates application summary report
    Given I am an administrator on the Reports page
    When I select "Application Summary Report"
    And I specify the date range "2026-01-01" to "2026-06-30"
    And I click "Generate Report"
    Then the system should display a report containing:
      | Metric                      | Example Value |
      | Total Applications Received | 250           |
      | Applications Submitted      | 250           |
      | Applications In Review      | 45            |
      | Applications Shortlisted    | 30            |
      | Applications Rejected       | 175           |
      | Average Time to Review      | 5 days        |
    And a visual chart should display the status distribution
    And I should be able to export the report as PDF or CSV
    
  Scenario: Administrator filters report by position
    Given I am generating an Application Summary Report
    When I select position filter "Senior Developer"
    And I click "Apply Filter"
    Then the report should show metrics only for "Senior Developer" position
    And the report title should indicate the position filter applied
    And the report should display how many applications were received for that position
    
  Scenario: Administrator views time-series report of applications
    Given I am on the Reports page
    When I select "Application Trend Report"
    And I set the date range and select "Monthly" aggregation
    And I click "Generate Report"
    Then a line chart should display:
      | Axis | Data                         |
      | X    | Months (Jan, Feb, Mar, etc) |
      | Y    | Number of applications      |
    And each month should show application count for that period
    And I should be able to compare trends across months
```

---

## Story Point Estimation Summary

| Story ID | Story Title | Story Points | Complexity | Priority |
|----------|------------|--------------|-----------|----------|
| #1 | User Application Submission | 5 | Medium | High |
| #2 | Admin View/Filter Applications | 8 | High | High |
| #3 | User Application Tracking | 5 | Medium | High |
| #4 | Admin Update Status & Comments | 8 | High | High |
| #5 | System Notifications | 8 | High | Medium |
| #6 | Admin Reporting | 13 | Very High | Medium |

### Total Story Points: 47

---

## Baseline Stories

**Baseline Stories** (Core MVP - Must be completed first):
- Story #1: User Application Submission (5 points)
- Story #2: Admin View/Filter Applications (8 points)
- Story #3: User Application Tracking (5 points)
- Story #4: Admin Update Status & Comments (8 points)

**Baseline Total: 26 story points**

**Additional/Enhancement Stories:**
- Story #5: System Notifications (8 points)
- Story #6: Admin Reporting (13 points)

---

## Estimation Methodology

**Story Points Used:** Fibonacci Scale (1, 2, 3, 5, 8, 13, 21...)

**Estimation Factors Considered:**

1. **Complexity** - Technical difficulty and implementation scope
2. **Effort** - Time required for development, testing, and review
3. **Uncertainty** - Unknown factors and dependencies
4. **Testing** - QA effort and test scenario coverage
5. **Integration** - How the story integrates with existing system

### Point Breakdown Examples:

- **5 Points (Medium)**: Straightforward features with clear requirements, basic CRUD operations, standard error handling
  - Example: User Application Submission, User Tracking
  
- **8 Points (High)**: Features with multiple workflows, complex filtering/searching, permission checking, notification triggers
  - Example: Admin Dashboard, Status Updates & Comments, Notifications
  
- **13 Points (Very High)**: Complex features involving multiple systems, advanced reporting, data aggregation, export functionality
  - Example: Advanced Reporting & Analytics

---

## Notes for Development Team

1. **Dependencies**: Story #1 should be completed before Stories #2, #3, #4
2. **Testing**: Each scenario should have corresponding automated tests written using Cucumber/Behave
3. **Database**: Consider creating application status state machine to validate transitions
4. **Security**: Implement role-based access control (RBAC) for all admin features
5. **Performance**: Optimize filtering and search queries, consider pagination for large datasets
6. **Accessibility**: Ensure all forms and dashboards meet WCAG 2.1 AA standards
7. **Documentation**: Update API documentation for each completed story

