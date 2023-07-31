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
    }
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
