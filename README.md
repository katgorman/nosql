# Inventory System 
A simple web-based inventory manager built with Node.js, Express, and MongoDB.
**Repo:** [https://github.com/katgorman/no-sql](https://github.com/katgorman/no-sql/tree/main)

## Team Members
- Kat Gorman
- Sasha Dzhanibekova

## Tech Stack
**Backend:** Node.js, Express, Mongoose  
**Database:** MongoDB  
**Frontend:** HTML, CSS, JavaScript

## Getting Started
1. **Clone the repo**  
   `git clone https://github.com/yourusername/no-sql-inventory-system.git`  
   `cd no-sql-inventory-system`
2. **Install dependencies**  
   `npm install`
3. **Start MongoDB** (locally on `mongodb://127.0.0.1:27017`)  
4. **Run the server**  
   `npm start`
5. **Open the app**  

## API Endpoints
| Method | Endpoint        | Action                 |
|--------|----------------|-----------------------|
| GET    | /api/items     | List all items        |
| POST   | /api/items     | Add a new item        |
| PUT    | /api/items/:id | Update an item        |
| DELETE | /api/items/:id | Delete an item        |

## Usage
- Fill out the form to **add an item**  
- Click **Update** on a row to open a modal for editing  
- Click **Delete** to remove an item  
