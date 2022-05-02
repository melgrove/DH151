
<h1 align="center"> DGT HUM 151 <em>Updated</em> Project Proposal </h1>

# Introduction
*Group Name*: **✨🥪Sandwich🥪✨**  
*Description*: *Our* group is working to create a mapping and geospatial section of the existing website/open source project **www.thedatagrid.org** ([github](https://github.com/The-Data-Grid/The-Data-Grid))  

# Team Members

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

# Overview

_The Data Grid_ is an open source web platform for environmental data which focuses on allowing anyone to upload datasets and view datasets. Core to its design
is the ability to house _any_ dataset that wants to be stored, which is implemented by offering a system to create and manage custom databases without code. It 
uses a database called PostgreSQL and an extension called PostGIS, which allows The Data Grid to perform complex geospatial operations extremely efficiently. 
Currently the website does not leverage the geospatial ability of its backend (database and web server) with a frontend (viewable website) tailored for mapping
or GIS. The _Sandwich_ team is going to work on this, with the goal of making _The Data Grid_ a powerful platform for open geospatial data.

Read about what _The Data Grid_ is [here](https://www.thedatagrid.org/about). Read about how to use it [here](https://www.thedatagrid.org/guide).

# Motivation

Mapping is an extremely powerful tool for understanding data which can be represented geospatially. A visual model (a map) allows humans to make connections and
inferences about data that would otherwise be impossible. The internet and more specifically the paradigm of modern websites is an extremely good platform to host
mapping tools for a couple of reasons:
- **Accessibility of Computation**: Complex mapping solutions require significant computation that must be done with high performance software. Websites provide a 
  controlled and safe environment for anyone in the world to download and run code which has been written by someone else (JavaScript running in a web browser). 
  This means that the computation needed for web mapping is made accessible through the web. 
- **Distribution**: The internet allows mapping software to be distributed extremely easily and quickly.

# Methodology
## Discussion
### A _view_ as an abstract relationship
A thought that I have been toying with is the idea that any way for a human to view data expresses a relationship within the data, which in some respect
is kind of like metadata. For the purpose of this thought experiment, when I say "data", I am treating it as an atomic structure. When humans read
data, we never look at one piece of data at a time in isolation because it's not useful. That would be like trying to gain something by being given
just the number "70", with no context to what has been measured to be a "70". Even with the additional information of what the "70" refers to — let's say
it refers to someone's height in inches — it's not very useful without the heights of other people within the population. When reading multiple values of data
like this, where every value is taken within the context of the others and thus _related_ to the others, something is gained about each value in the set.
This is one of the most common _views_ of data, _column data_. 

We can extend column data by adding columns to create a table. A single piece of data in a table,
or a cell, is related not only to the rest of the values in its column, but also the values in its row. Although it's assumed that everyone knows how the
row and column relationships work, I don't think that it's neccessarily a canonical interpretation of a matrix. The most succinct way I can describe it is:

> **Abstracted Model:**  
> A row represents a single atomic entity, while a column represents a single property of an entity. Additionally, 
> 1. Cells in the same row are properties of the same entity 
> 2. Cells in the same column are the same properties of different entities 
> 3. Within the entire table each entity has to be of the same class. 

It doesn't seem
very simple now that it's been spelled out! What may be the most wishy-washy to me is the definition of a class, ie what constitutes the requirement for
the relationship between the rows. The real world gives us an easy interpretation, because there are countless examples of processes which "attempt" to make
many copies of the same thing, but end up making many slightly different things. In this case, the rows can be related by the _process_ that creates them.

We can continue our abstraction of table views to map views. When data is viewed with a map, we go away with the notion of relating data by rows or columns, or by interpretation
relating data by _entities and properties_. The first relationship that isn't present with table data is the basemap. A geospatial data point allows us to
place it on a map of the world (provided the point is a point on earth). This gives us an instant relationship with other geospatial data. Here is an interesting
interpretation: _This is the exact same thing as our previous column based interpretation of a common property, but in two dimensions_. Think about it! You could
take the latitudes and longitudes of _any_ data, stack them into two columns respectively, and it would make perfect sense! So here is my preferred interpretation
of a geospatial view of data from a tabular perspective: _geospatial columns of any data (even data that would not be related by row, or entity) are common properties that can be 
stacked in a single column_. This is pretty interesting, a geospatial property can act as a shared property between arbitrary entities.

### Application of our abstracted model
In The Data Grid, the main way to view data is with a table of columns and rows (_[see here](https://www.thedatagrid.org/filter)_). Each row is either an _observation_ or an _item_. Within the context of TDG's
data model, observations are instances of items, where many observations can be recorded of a single item. The relationship of rows for items or observations is
as we described previously, by a common _process_. We are interested in creating a _geospatial view_ for a system that has been designed with a _tabular view_ 
in mind. As mentioned, The Data Grid has the concept of _items_ and _observations_, both of which are ways to relate rows in a table to eachother. With a map,
however, we are interested in relating data by its common geospatial properties. From a tabular perspective, we are essentially stacking rows, but only matching 
up the geospatial columns, thus forgoing the 3rd requirement for tabular data: _Within the entire table each entity has to be of the same class_. 

With this _tabular view_ interpretation of a _geospatial view_, we can finally start to design the architecture needed to create a map on The Data Grid. 
The platform has many conditions for a row to be related to another row and thus for a table to be displayed. In terms of our abstracted model this is analagous
to there being many different _classes of entities_. The various options which uniquely define a _class of entities_ is below:
1. Database
2. Item or Observation
3. Feature  

One must select a value for all three of these options before it is possible to relate rows to eachother and display a table. Accordingly, when requesting 
data from the API, all three of these options must be specified so the server can create a valid SQL query to return tabular data. With the 
_geospatial view_, we no longer need to conform to this constraint. In theory, it would be possible to display geospatial data from _all_ 
databases, from _all_ features, and from both items and observations on a single map, since the only row relation needed is the geospatial property.
In practice, there is a very good technical question of whether we should allow entities from _any_ of the classes to be combined together.
Surely it would be interesting to see data from different databases in the same map, but it introduces complexity. 

In the following section we will use this understanding of the _geospatial view_ to create the requirements that we would like the feature
to have when successfully implemented. Another name for the following section is "definition of done".

## Feature Requirements
### Midterm
1. A user can display _any_ geospatial data on a map, regardless of the database, query type (item/observation), or feature
   1. Points, lines, and regions can all be viewed on top of eachother
   2. UI for selection of geospatial fields to query and display
   3. Scale, zoom level, attribution, and other standard niceties
2. A user can see data that is associated by entity (1. in the _abstracted model_) to any geospatial column. ie the rest of the data from the row that
the geospatial column is in can be viewed when clicking on it.
### Final
1. A user can perform geospatial filters using the query builder
   1. The following functions are supported: contains, crosses, disjoint, within distance, equals, intersects, touches, overlaps, within
   2. A point, line, or region can be drawn on the map and used as one of the inputs in the above functions
2. ...

# Workflow

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

# Techinal Scope

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

# Geographical Scope

_The Data Grid_ does not limit itself to a particular region, and thus the mapping section of it should support geospatial data from anywhere in the world.

# Data

The data which will be mapped is dynamic, since it can be uploaded by any organization on the website. An example of geospatial data that will certainly
be mapped is the location of every waste bin on campus (I lead the team that collected this data, [see here](https://github.com/melgrove/bin-label)) as 
well as the region of every the UCLA buildling (see [map.ucla.edu](https://map.ucla.edu)).
