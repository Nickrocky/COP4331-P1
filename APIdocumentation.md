swagger: '2.0'
info:
  description: This is the API documentation for the COP 4331 Contact Manager App
  version: 1.0.0
  title: Contact Manager App
  # put the contact info for your development or API team
  contact:
    email: st201789@ucf.ed

  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html


paths:
  /Login.php:
    post:
      tags:
      - Users
      summary: Logs in to contact manager app
      operationId: doLogin
      description: Logs in to contact manager app
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: loginItem
        description: Login
        schema:
          $ref: '#/definitions/Login'
      responses:
        200:
          description: OK
        404:
          description: URL Not Found
        500:
          description: Server Error
  /Signup.php:
    post: 
      tags:
      - Users
      summary: Adds a new user 
      operationId: signup
      description: Adds a new user to the contact manager app database
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: SignupItem
        description: Signup
        schema:
          $ref: '#/definitions/Signup'
      responses:
        200:
          description: OK
        404:
          description: URL Not Found
        500:
          description: Server Error
  /SearchContact.php:
    post:
      tags:
      - Contacts
      summary: Searches contact
      operationId: searchContact
      description: Searches contacts from contact manager app database
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: searchContact
        description: Contact search
        schema:
          $ref: '#/definitions/Search'
      responses:
        200:
          description: OK
        404:
          description: URL Not Found
        500:
          description: Server Error
  /AddContact.php:
    post:
      tags:
      - Contacts
      summary: Adds a contact
      operationId: addcontact
      description: adds a contact to the contact manager app database 
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: contactItem
        description: Contact
        schema:
          $ref: '#/definitions/Add'
      responses:
        200: 
          description: OK
        404:
          description: URL Not Found
        500:
          description: Server Error
  /UpdateContact.php:
    post:
      tags:
      - Contacts
      summary: updates a contact
      operationId: updatecontact
      description: updates a contact from the contact manager app database 
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: contactItem
        description: Contact Update
        schema:
          $ref: '#/definitions/Update'
      responses:
        200: 
          description: OK
        404:
          description: URL Not Found
        500:
          description: Server Error
  /DeleteContact.php:
    post:
      tags:
      - Contacts
      summary: deletes a contact
      operationId: deletecontact
      description: updates a contact from the contact manager app database 
      consumes:
      - application/json
      produces:
      - application/json
      parameters:
      - in: body
        name: contactItem
        description: Contact Deletion
        schema:
          $ref: '#/definitions/Delete'
      responses:
        200: 
          description: OK
        404:
          description: URL Not Found
        500:
          description: Server Error
          
definitions:
  Login:
    type: object
    required:
    - login
    - password
    properties:
      login:
        type: string
        example: "jackg"
      password:
        type: string
        example: "footy"
    
  Signup:
    type: object
    required:
    - firstname
    - lastname
    - login
    - password
    properties:
      firstname:
        type: string 
        example: "carl"
      lastname:
        type: string 
        example: "smith"
      login:
        type: string
        example: "carlJr"
      password:
        type: string
        example: "Hardees"
        
  Search:
    type: object
    required:
    - search
    - userId
    properties:
      search:
        type: string
        example: "Joe"
      userId:
        type: integer
        example: "2"
        
  Add:
    type: object
    required:
    - name
    - phone
    - email
    - userId
    properties:
      firstname:
        type: string 
        example: "carl"
      phone:
        type: string
        example: "201-701-2788"
      email:
        type: string
        example: "carl@ucf.edu"
      userId:
        type: integer
        example: "7"
  
  Update:
    type: object
    required:
    - contactname
    - name
    - phone
    - email
    - userId
    properties:
      contactname:
        type: string
        example: "Joe"
      name:
        type: string
        example: "Daisy"
      phone:
        type: string
        example: "000000000"
      email:
        type: string
        example: "daisy@gmail.com"
      userId:
        type: integer
        example: "5"
  
  Delete:
    type: object
    required:
    - name
    properties:
      name:
        type: string
        example: "Joe"
        
host: contactus.digital
basePath: /LAMPAPI
schemes:
- http
