# 🥪 Sandwich Team: Week 3 Progress
## Inpsiring Sites
### [Purple Air](https://map.purpleair.com)
![image](https://user-images.githubusercontent.com/38347766/166129848-500a349e-fe42-4623-aed4-04137fad9bae.png)
Purple Air has achieved what TDG aims to achieve in the sense of creating a very good world wide data portal and map. They have crowdsorced data 
from all over (from anyone who buys a Purple Air Sensor) and display it on a live website with a map and a graph of air quality over time. This
is a really incredible public resource for air quality! There are _many many_ open data portals, but very few provide the tools to look at and
make conclusions from the data on the site itself. One would have to download a large file with all the data, import it into some software, and
then do their own visualization or analysis. These are skills that not very many people have, making understanding open data inaccessible.

## Datasets
For the midterm I am going to use only the UCLA waste bin data that I have personally collected. It's because that is the initial intention of 
TDG, and is relevant to UCLA. For the final project, I'm going to import many external open databases and have many many datasets that can be
browsed. I will go into more detail in the midterm report, but from a high level, to import the UCLA waste bin data I will take the following steps:
1. Create a Database specification configuration file for the waste bin data (JSON)
2. Use TDG's command line interface to generate a PostgreSQL database from the configuration file
3. Deploy the updated database to the cloud with AWS RDS (may change to Google Cloud PostgreSQL)
4. Insert the waste bin data into the database using TDG's upload API
5. _Done!_ Now the waste bin data is openly available to query via `api.thedatagrid.org`

## Site Design
The mapping section of the website will be found on the **Data** page (www.thedatagrid.org/filter) of the website since a map is really just another
view of the same data which is already displayed in table form on that page. There will be a UI component which switches the table view to a map when
clicked. There will likely be some mapping controls which become available when in map view. 
### A _view_ as an abstract relationship
A thought that I have been toying with is the idea that any way for a human to view data expresses a relationship within the data, which in some respect
is kind of like metadata. For the purpose of this thought experiment, when I say "data", I am treating it as an atomic structure. When humans read
data, we never look at one piece of data at a time in isolation because it's not useful. That would be like trying to gain something by being given
just the number "70", with no context to what has been measured to be a "70". Even with the additional information of what the "70" refers to — let's say
it refers to someone height in inches — it's not very useful without the heights of other people within the population. When reading multiple values of data
like this, where every value is taken within the context of the others and thus _related_ to the others, something is gained about each value in the set.
This is one of the most common _views_ of data, _column data_. 

We can extend column data by adding columns to create a table. A single piece of data in a table,
or a cell, is related not only to the rest of the values in its column, but also the values in its row. Although it's assumed that everyone knows how the
row and column relationships work, I don't think that it's neccessarily a canonical interpretation of a matrix. The best succinct way I can describe it is: 
_A row represents a single atomic entity, while a column represents a single property of an entity. Additionally, 1. Cells in the same row are properties of the same entity 2.
Cells in the same column are the same properties of different entities 3. Within the entire table each entity has to be of the same class_. It doesn't seem
very simple now that it's been spelled out! What may be the most wishy-washy to me is the definition of a class, ie what constitutes the requirement for
the relationship between the rows. The real world gives us an easy interpretation, because there are countless examples of processes which "attempt" to make
many copies of the same thing, but end up making many slightly different things. In this case, the rows can be related by the _process_ that creates them.

In The Data Grid, the main way to view data is with a table of columns and rows (_[see here](https://www.thedatagrid.org/filter)_). Each row is either an _observation_ or an _item_. Within the context of TDG's
data model, observations are instances of items, where many observations can be recorded of a single item. The relationship of rows for items or observations is
as we described previously, by a common _process_. 

Enough about tables. Let's talk about maps. When data is viewed with a map, we go away with the notion of relating data by rows or columns, or by interpretation
relating data by _entities and properties_. The first relationship that isn't present with table data is the basemap. A geospatial data point allows us to
place it on a map of the world (provided the point is a point on earth). This gives us an instant relationship with other geospatial data. Here is an interesting
interpretation: _This is the exact same thing as our previous column based interpretation of a common property, but in two dimensions_. Think about it! You could
take the latitudes and longitudes of _any_ data, stack them into two columns respectively, and it would make perfect sense! So here is my preferred interpretation
of geospatial columns of tabular data: _geospatial columns of any data (even data that would not be related by row, or entity) are a common property that can be 
stacked in a single column_. This is pretty interesting, a geospatial property can act as a shared property between arbitrary entities.

Ok. Let's use this newfound mental model. After all, we are interested in creating a _geospatial view_ for a system that has been designed with a _tabular view_ 
in mind. As we mentioned before, The Data Grid has the concept of _items_ and _observations_, both of which are ways to relate rows in a table to eachother. With a map, however, we are interested in relating data by its common geospatial properties. From a tabular perspective, we are essentially stacking rows, but only matching up the geospatial columns, thus forgoing the 3rd requirement for tabular data: _Within the entire table each entity has to be of the same class_. 

With this _tabular view_ interpretation of a _geospatial view_, we can finally start to design the architecture needed to create a map on The Data Grid. 
The platform has many conditions for a row to be related to another row and thus for a table to be displayed. In terms of our mental model this is analagous
to there being many different _classes of entities_. The various options which uniquely define a _class of instances_ is below:
1. Database
2. Item or Observation
3. Feature
One must select a value for all three of these options before it is possible to relate rows to eachother and display a table. Accordingly, when requesting data from the API, all three of these options must be specified so the server can create a valid SQL query to return tabular data. With the _geospatial view_, we no longer need to conform to this constraint. In principle, it would be possible to display geospatial data from _all_ databases, from _all_
features, from both items and observations on a single map, since the only row relation needed is the geospatial property.


in a view. In a table view, 
    document any insightful sites you found and describe why it inspires you;
    describe in more detail the datasets you plan to use, and how;
    begin to articulate what the site will look like;
    report responsitilities and progress made by each group member;
    describe your hopes on how the site will help a particular cause;
    include images, photos, sketches to visually enhance your post;
