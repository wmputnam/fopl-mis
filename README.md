# Friends of the Petaluma Library Member Information System
## TL;DR
This is a TypeScript and React TSX application to manage membership data for the Petaluma Friends of the Library

### Backend
Basic CRUD service support to store member information in a database -- MongoDB in this instance

### Frontend
React Javascript single page application (my first one)

Member list page
Member edit/view page to support adding and editing members
Member details list pages for notes and remittances

### Database
Data is stored locally in a MongoDB Docker instance

Scripts support backing up and restoring the DB via MongoDB CLI

Data extracts for mailing labels and such is supported via MongoDB Compass appication

### Testing
Every effort has been made to support a use-case driven test-as-you-code approach so that changes which break the usage can be caught and dealt with

### Development environment
Code development supported by VSCode using a MacBook Pro

Package management for dependencies on third party code supported by NPM

Private package creation and managmement supported by Verdaccio NPM repository server running locally in a Docker VM

### Source cocde management
Source code changes are managed using git and stored on wmputnam github account (to be documented in package.json)

### Acknowledgements
First and foremost I acknowledge that after 40 + years as a professional software developer I am still very much a student and I rely on all the lessons learned from co-students and co-workers along the way.
