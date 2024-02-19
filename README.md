# My PocketBase Application

## Overview

This project utilizes PocketBase as the backend infrastructure to manage and store data for a web application. Below is an explanation of the key components:

### Production API Endpoint

The production API endpoint is available at the following URL: `https://rydlande.pockethost.io/api`.

### Datastore

The datastore in PocketBase serves as the underlying database system where all the data for the application is stored. It consists of the following key elements:

- **Collections**: Data is organized into collections, each containing a group of related documents.
- **Documents**: Individual records stored within collections, represented as JSON-like objects.
- **Fields**: Key-value pairs that define the attributes or properties of a document.
- **Queries**: Operations used to retrieve, manipulate, and analyze data stored in the datastore.
- **Indexes**: Data structures used to optimize query performance by allowing faster retrieval of data based on certain criteria.
- **Aggregation**: Operations for processing multiple documents to calculate aggregated results.

(I have not used indexes in this project).

### Endpoints

The application interacts with the PocketBase backend through API endpoints, allowing for data manipulation and retrieval. The following endpoints are utilized:

- `/api/collections/data/records`: Base-type collection for storing data records.
- `/api/collections/allergies/records`: View-type collection for managing allergy data.

## Data Collections

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
