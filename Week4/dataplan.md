# 🥪 Sandwich Team: Data Plan
## Datasets
For the midterm, the only dataset that we will use is the UCLA bin data set. My team members and myself from the Renewable Energy Association at UCLA collected and cleaned the dataset over the past year. The repository, which includes not only the data itself but also information about how it was collected and data cleaning source code files can be found [here](https://github.com/melgrove/bin-label). There are 557 features.

For the final, I want to import many open datasets to highlight the richness of The Data Grid's interface.

## Application
Getting the data into TDG is just as I specified in the previous blog post:
1. Create a Database specification configuration file for the waste bin data (JSON)
2. Use TDG's command line interface to generate a PostgreSQL database from the configuration file
3. Deploy the updated database to the cloud with AWS RDS (may change to Google Cloud PostgreSQL)
4. Insert the waste bin data into the database using TDG's upload API
5. Done! Now the waste bin data is openly available to query via api.thedatagrid.org

It's not completely clear to me yet how the map will work and what the software architecture is for the API requests, but I will figure that out soon. In essence, the waste bin data will be provided in JSON format to the frontend Angular application (https://www.thedatagrid.org) via the Node.js/PostgreSQL API (https://api.thedatagrid.org). At that point the Angular application will transform the data into a Leaflet understandable data structure and render it on the filtering page.
