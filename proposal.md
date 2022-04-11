# DGT HUM 151 Project Proposal

## Introduction
*Group Name*: **✨🥪Sandwich🥪✨**  
*Description*: *Our* group is working to create a mapping and geospatial section of the existing website/open source project **www.thedatagrid.org** ([github](https://github.com/The-Data-Grid/The-Data-Grid))  

## Team Members

<table style="visibility:hidden;">
  <tbody>
    <tr>
      <td>
        <img align="left" width="150px" src="https://raw.githubusercontent.com/melgrove/DH151/main/Week1/static/me.jpg">
      </td>
      <td>
        <b>Oliver Melgrove</b> is one of the many <em>Sandwich</em> team members. He is a Junior at UCLA studying Statistics. He likes to do pottery. <sub><em>(oh my god he's even doing it in the picture he can't stop someone help him oh no!)</em></sub>
      </td>
    </tr>
  </tbody>
</table>

## Overview

_The Data Grid_ is an open source web platform for environmental data which focuses on allowing anyone to upload datasets and view datasets. Core to its design
is the ability to house _any_ dataset that wants to be stored, which is implemented by offering a system to create and manage custom databases without code. It 
uses a database called PostgreSQL and an extension called PostGIS, which allows The Data Grid to perform complex geospatial operations extremely efficiently. 
Currently the website does not leverage the geospatial ability of its backend (database and web server) with a frontend (viewable website) tailored for mapping
or GIS. The _Sandwich_ team is going to work on this, with the goal of making _The Data Grid_ a powerful platform for open geospatial data.

Read about what _The Data Grid_ is [here](https://www.thedatagrid.org/about). Read about how to use it [here](https://www.thedatagrid.org/guide).

## Methodology

Mapping is an extremely powerful tool for understanding data which can be represented geospatially. A visual model (a map) allows humans to make connections and
inferences about data that would otherwise be impossible. The internet and more specifically the paradigm of modern websites is an extremely good platform to host
mapping tools for a couple of reasons:
- **Accessibility of Computation**: Complex mapping solutions require significant computation that must be done with high performance software. Websites provide a 
  controlled and safe environment for anyone in the world to download and run code which has been written by someone else (JavaScript running in a web browser). 
  This means that the computation needed for web mapping is made accessible through the web. 
- **Distribution**: The internet allows mapping software to be distributed extremely easily and quickly.

## Workflow

1. Planning
    1. Proposal, feature selection, goals
    2. System requirements
    3. Software architecture, documentation
    4. Wireframes and UI planning
2. Execution
    1. Update database schema if changes are needed
    2. Update API if changes are needed
    3. Write frontend section
    4. Write user guide

## Techinal Scope

I will be using _The Data Grid_'s existing github for version control because that is where the project is housed and there are existing deployment hooks (Netlify) and
test suites (github actions) connected to it. The existing codebase is written in:
- **PostgreSQL, PL/pgSQL, PostGIS**: Database
- **JavaScript (Node.js)**: API (`api.thedatagrid.org`)
- **Angular 8 (TypeScript, HTML, CSS)**: Frontend website (`www.thedatagrid.org`)

For the web mapping section we will be using:
- **Leaflet**: Web mapping software for frontend
- **Angular 8 (TypeScript, HTML, CSS)**: Integrating Leaflet into the frontend
- **JavaScript (Node.js)**: Writing new API endpoints on the backend (if need be)
- **PostgreSQL**: Writing new database queries on the backend (if need be)

## Geographical Scope

_The Data Grid_ does not limit itself to a particular region, and thus the mapping section of it should support geospatial data from anywhere in the world.

## Data

The data which will be mapped is dynamic, since it can be uploaded by any organization on the website. An example of geospatial data that will certainly
be mapped is the location of every waste bin on campus (I lead the team that collected this data, [see here](https://github.com/melgrove/bin-label)) as 
well as the region of every the UCLA buildling (see [map.ucla.edu](https://map.ucla.edu)).
