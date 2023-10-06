---
id: rest_api
title: REST API
description: ""
pagination_prev: reference/open_source
pagination_next: 
---
:::info
To use the Datafold REST API, you should first [create a Datafold API Key](/reference/cloud#create-an-api-key).
:::

Use Datafold's REST API to create new data diffs and get diff results.

## Examples
### Create A New Diff

| <div style={{ width: '290px' }}>Parameter</div> | <div style={{ width: '290px' }}>Value</div> |
| ----------- | ----------- |
| ** Endpoint ** |`/api/v1/datadiffs`|
| ** Method **|`POST`|
| ** Request Content-Type ** |`application/json`|
| ** Response Content-Type ** |`application/json`|
| ** Auth **| API key header. Example: <br /> `headers = {'Authorization': 'Key <api_key>'}`|

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="request" label="Request" >
```
Example request body:
```json
{
    // Values for data_source_id are generated when creating a data source integraiton within the Datafold app.
    // When diffing within one data source (e.g., BigQuery <> BigQuery), use the same id for each of these 2 params.
    // When diffing between data sources (e.g., Postgres <> Snowflake) use different values for data_source1_id and data_source2_id.
    "data_source1_id": 1,
    "data_source2_id": 1, 
    "table1": [
        "DATABASE",
        "SCHEMA",
        "TABLE_1"
    ],
    "table2": [
        "DATABASE",
        "SCHEMA",
        "TABLE_2"
    ],

    // Note: Queries are not currently supported for Cross-DB diffs.
    "query1": null, // If table1 is null, a string containing a SELECT statement must be submitted as query1.
    "query2": null, // If table2 is null, a string containing a SELECT statement must be submitted as query2.

    // If materialization_destination_id is not null, data diff results will be materialized in your data warehouse.
    // If a data source id is provided in this field, the value-level diff results (instead of the sample of values that is available
    // by default in the Datafold application) will be written to the data source.
    "materialization_destination_id": null, 

    // If materialize_without_sampling is false, the materialized data diff results will be sampled (by default). This default behavior protects against accidental expensive writes to the data warehouse.
    "materialize_without_sampling": false,

    "pk_columns": [
        "PRIMARY_KEY"
    ], // Optional, but recommended. Composite primary keys are supported. If null, only row counts and column structure differences will be returned.
    "include_columns": ["COLUMN_A", "COLUMN_B"], // Optional. Only these non-PK columns will be diffed.
    "exclude_columns": ["COLUMN_C", "COLUMN_D"], // Optional. These non-PK columns will NOT be diffed.
    "time_column": ["CREATED_AT"], // Optional. This column will be used to generate a time series visual of differences in the Datafold app.

    // Optional. filter can be a SQL WHERE clause that is applied to the table.
    // Note: Filters are not currently supported for Cross-DB diffs.
    "filter1": "created_at > '2022-01-01'", 
    "filter2": null,

    // Optional. time_travel can be applied to either side of the diff when supported by the data warehouse.
    // Time travel point in one of available formats: \n - Negative integer (ex. -150) \n - Timestamp (ex.2021-08-13T00:00:00) \n - Time point hash (ex. 019e3cc8-0400-96e0-0008-fb8300fb1cd2)
    // Note: Time travel points are not currently available for Cross-DB diffs.
    "time_travel_point1":  "019e3cc8-0400-96e0-0008-fb8300fb1cd2",
    "time_travel_point2": null,

    "sampling_tolerance": 0.001, // Optional. Percentage of rows that may have primary key errors (e.g. null, duplicate or primary keys exclusive to one dataset) before sampling is disabled. 
    // The value should be between a numeric percentage value [0.0, 100.0]. 
    // This setting exists to allow you to sample *only if* you have an acceptably low rate of primary key issues.
    // If the sampling_tolerance is exceeded, every row of the entire table will be diffed.
    "sampling_confidence": 99.0, // Optional. Minimum confidence level that the amount of rows with primary key errors is less than the rate specified in Sampling Tolerance. 
  
    // As an example to connect sampling_tolerance and sampling_confidence: If the value for sampling_tolerance is 0.001, and the value for sampling confidence is 99.0 (as in the example above), sampling would be disabled for the diff if there is a 99% probability that the rate of rows with primary key errors for the entire table is above 0.001%.

    "sampling_threshold": null, // Sampling will be disabled if total row count of the largest table is less that the threshold value.

    "diff_tolerances_per_column": [],
    // Optional. Acceptable delta between numeric values to determine a matched value. Helpful for rounding differences within long floating decimals.
    
    // "diff_tolerances_per_column": 
    //    [ 
    //      { 
    //        "column_name": "my_column", 
    //        "tolerance_value": 0.01, // <- equivalent to 1% when tolerance_mode "relative" 
    //        "tolerance_mode": "relative" 
    //      }, 
    //      { 
    //        "column_name": "my_other_column", 
    //        "tolerance_value": 0.01, // <- literal 0.01 when tolerance_mode "absolute" 
    //        "tolerance_mode": "absolute" 
    //      } 
    //    ],
    
    // "relative" is the acceptable percentage difference between values in A & B.
    //   - No difference if abs(A/B - 1) <= Relative Tolerance Value

    // "absolute" reflects the absolute decimal difference between values in A & B 
    //   - No difference if abs(A - B) <= Absolute Tolerance Value

    "bisection_factor": null, // Optional, Cross-DB only: Segments per comparison iteration. Increasing this value may improve performance for extremely large data sets.
    "bisection_threshold": null, // Optional, Cross-DB only: If row count is below this threshold, diff will compare the data outside of the warehouse. Increasing this value may improve performance in datasets with large amounts of expected differences.
    "diff_threshold": null // Optional, Cross-DB only: The number of diffs to find before ending diff execution. Differing rows and exclusive primary keys count towards this threshold. This field is important if, for example, the user only cares about whether the table contains any differences at all. Expects null or an integer. Null on an xdb diff defaults to 1000.

}
```

```mdx-code-block
  </TabItem>
```


```mdx-code-block
  <TabItem value="response" label="Response" >
```

The response will contain all data from the request with missing values filled in with either nulls or defaults. In addition to that, it returns the diff `id` to be used in subsequent API calls, and additional metadata.
```json
{
    "data_source1_id": 1,
    "data_source2_id": 1,
    "table1": [
        "DATABASE",
        "SCHEMA",
        "TABLE_1"
    ],
    "table2": [
        "DATABASE",
        "SCHEMA",
        "TABLE_2"
    ],
    "query1": null,
    "query2": null,
    "materialization_destination_id": null,
    "materialize_without_sampling": false,
    "pk_columns": [
        "PRIMARY_KEY"
    ],
    "include_columns": [],
    "exclude_columns": [],
    "time_column": null,
    "time_aggregate": null,
    "filter1": null,
    "filter2": null,
    "time_travel_point1": null,
    "time_travel_point2": null,
    "time_interval_start": null,
    "time_interval_end": null,
    "sampling_tolerance": null,
    "sampling_confidence": null,
    "sampling_threshold": null,
    "diff_tolerances_per_column": null,
    "tags": null,
    "id": 544266,
    "user_id": 3126,
    "done": false,
    "status": "waiting",
    "source": "api",
    "result_statuses": {},
    "updated_at": "2022-10-12T20:06:27.653283+00:00",
    "created_at": "2022-10-12T20:06:27.653283+00:00",
    "diff_stats": {
        "diff_pks": null,
        "diff_rows": null,
        "diff_values": null
    },
    "bisection_factor": null,
    "bisection_threshold": null,
    "diff_threshold": null
}
```

```mdx-code-block
  </TabItem>
  <TabItem value="curl" label="Curl Request Example" >
```

```bash
curl --location --request POST 'https://app.datafold.com/api/v1/datadiffs' \
--header 'Authorization: <api_key>' \
--header 'Content-Type: application/json' \
--data-raw '{
  "data_source1_id": 1,
  "data_source2_id": 1,
  "table1": [
    "DATABASE",
    "SCHEMA",
    "TABLE_1"
  ],
  "table2": [
    "DATABASE",
    "SCHEMA",
    "TABLE_2"
  ],
  "query1": null,
  "query2": null,
  "materialization_destination_id": null,
  "materialize_without_sampling": false,
  "pk_columns": [
    "PRIMARY_KEY"
  ],
  "include_columns": null,
  "exclude_columns": null,
  "time_column": null,
  "time_aggregate": null,
  "filter1": null,
  "filter2": null,
  "time_travel_point1": null,
  "time_travel_point2": null,
  "time_interval_start": null,
  "time_interval_end": null,
  "sampling_tolerance": null,
  "sampling_confidence": null,
  "sampling_threshold": null,
  "diff_tolerances_per_column": null
  "bisection_factor": null,
  "bisection_threshold": null,
  "diff_threshold": null
}'
```

```mdx-code-block
  </TabItem>
  <TabItem value="python" label="Python Request Example" >
```

```python
import requests
import json

url = "https://app.datafold.com/api/v1/datadiffs"

payload = json.dumps({
  "data_source1_id": 1,
  "data_source2_id": 1,
  "table1": [
    "DATABASE",
    "SCHEMA",
    "TABLE_1"
  ],
  "table2": [
    "DATABASE",
    "SCHEMA",
    "TABLE_2"
  ],
  "query1": None,
  "query2": None,
  "materialization_destination_id": None,
  "materialize_without_sampling": False,
  "pk_columns": [
    "PRIMARY_KEY"
  ],
  "include_columns": None,
  "exclude_columns": None,
  "time_column": None,
  "time_aggregate": None,
  "filter1": None,
  "filter2": None,
  "time_travel_point1": None,
  "time_travel_point2": None,
  "time_interval_start": None,
  "time_interval_end": None,
  "sampling_tolerance": None,
  "sampling_confidence": None,
  "sampling_threshold": None,
  "diff_tolerances_per_column": None
  "bisection_factor": None,
  "bisection_threshold": None,
  "diff_threshold": None
})
headers = {
  'Authorization': '<api_key>',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

```


```mdx-code-block
  </TabItem>
</Tabs>
```


### Get Diff Results

| <div style={{ width: '290px' }}>Parameter</div> | <div style={{ width: '290px' }}>Value</div> |
| ----------- | ----------- |
| ** Endpoint ** |`/api/v1/datadiffs/<id>/summary_results`|
| ** Method **|`GET`|
| ** Response Content-Type ** |`application/json`|
| ** Auth **| API key header. Example: <br /> `headers = {'Authorization': 'Key <api_key>'}` |

```mdx-code-block

<Tabs>

```


```mdx-code-block
  <TabItem value="success-response" label="Successful Response" >
```

Immediately after the diff is submitted, the response will contain the following:
```json
{
    "status": "running"
}
```
Or
```json
{
    "status": "waiting"
}
```

When the diff is complete, the status will be set to `success` and additional fields will contain high-level diff metadata:
```json
{
    "status": "success",
    "pks": {
        "total_rows": [
            1509,
            1761
        ],
        "nulls": [
            0,
            0
        ],
        "dupes": [
            0,
            303
        ],
        "exclusives": [
            0,
            5
        ],
        "distincts": [
            1509,
            1514
        ]
    },
    "values": {
        "total_rows": 1453,
        "rows_with_differences": 0,
        "total_values": 10171,
        "values_with_differences": 0,
        "compared_columns": 7,
        "columns_with_differences": 0,
        "columns_diff_stats": [
            {
                "column_name": "ABV",
                "match": 100.0
            },
            {
                "column_name": "IBU",
                "match": 100.0
            },
            {
                "column_name": "OUNCES",
                "match": 100.0
            },
            {
                "column_name": "BEER_NAME",
                "match": 100.0
            },
            {
                "column_name": "BEER_STYLE",
                "match": 100.0
            },
            {
                "column_name": "BITTERNESS",
                "match": 94.32
            },
            {
                "column_name": "BREWERY_ID",
                "match": 100.0
            }
        ]
    },
    "dependencies": {
        "deps": {}
    },
    "schema": {
        "columns_mismatched": [
            0,
            0
        ],
        "column_type_mismatches": 0,
        "column_reorders": 0,
        "column_counts": [
            8,
            8
        ]
    }
}
```

```mdx-code-block
  </TabItem>
  <TabItem value="error-response" label="Error Response" >
```

In the event of an error, the status will return as `failed`. And the `error` object will contain additional details.

Example:
```json
{
    "status": "failed",
    "error": {
        "error_type": "NoSuchTableException",
        "error_value": "DATABASE.SCHEMA.TABLE_1"
    }
}
```

```mdx-code-block
  </TabItem>
  <TabItem value="curl" label="Curl Request Example" >
```
Example curl command:
```bash
curl --location --request GET 'https://app.datafold.com/api/v1/datadiffs/<id>/summary_results' \
--header 'Authorization: <api_key>'
```

```mdx-code-block
  </TabItem>
  <TabItem value="python" label="Python Request Example" >
```
Example python request:
```python
import requests

url = `https://app.datafold.com/api/v1/datadiffs/<id>/summary_results`

payload={}
headers = {
  'Authorization': '<api_key>'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```


```mdx-code-block
  </TabItem>
</Tabs>
```
