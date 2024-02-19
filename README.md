# PocketBase API Documentation

This README.md provides an overview of the API endpoints and collections available in my PocketBase setup, along with details about the query used to populate the "allergies" collection.

## Endpoints

### /data/records

- **Description**: Represents a base-type collection called "data".
- **Functionality**: Allows CRUD (Create, Read, Update, Delete) operations on individual records stored in the "data" collection.
- **Fields**:
  - `id`: Unique identifier for each record.
  - `name`: Name of the student.
  - `companion`: Companion information.
  - `attending`: Boolean value indicating whether the student is attending.
  - `allergy`: Information about any allergies the student may have.

### /allergies/records

- **Description**: Represents a view-type collection called "allergies".
- **Functionality**: Derived from the "data" collection, used for querying and presenting aggregated or processed allergy data.
- **Fields**:
  - `id`: Unique identifier for each allergy record.
  - `allergy`: Name of the allergy.
  - `allergy_count`: Count of occurrences of each unique allergy in the "data" collection.

## Query for "allergies" Collection

The "allergies" collection is populated using the following SQL query:

```sql
SELECT allergy, COUNT(*) as allergy_count, (ROW_NUMBER() OVER()) as id
FROM data
GROUP BY allergy
HAVING COUNT(*) > 0
```

This query groups records in the "data" collection by allergy, calculates the count of each unique allergy, and filters out those with a count of zero.
