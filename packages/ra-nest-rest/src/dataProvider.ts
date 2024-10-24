import { stringify } from "query-string";
import { fetchUtils, DataProvider } from "ra-core";
import { filterTransform } from "./utils";
/**
 * Maps react-admin frontend queries to a PAAS REST APIs
 *
 * This REST dialect is similar to the one of FakeRest
 *
 * @example
 *
 * getList     => GET https://paas.bworks.app/api/resources?sort=['title','ASC']&range=[0, 24]
 * getOne      => GET https://paas.bworks.app/api/resources/123
 * getMany     => GET https://paas.bworks.app/api/resources?filter={id:[123,456,789]}
 * update      => PUT https://paas.bworks.app/api/resources/123
 * create      => POST https://paas.bworks.app/api/resources
 * delete      => DELETE https://paas.bworks.app/api/resources/123
 *
 * @example
 *
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 * import {dataProvider} from 'ra-nest-rest';
 *
 * import { PostList } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={simpleRestProvider('https://paas.bworks.app/api/')}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * export default App;
 * 
 * 
 * //custom method for raw post, get
 * import {useDataProvider} from 'react-admin';
 * const Comp = () => {
  const dataProvider = useDataProvider();

 * dataProvider
    .customMethod("todos", { filter: { title: "title" } }, "GET")
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

 * dataProvider
    .customMethod("todos", { data: { title: "title" } }, "POST")
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  * "Access-Control-Allow-Origin": "*" to disable CORS
 */

export default (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson,
  countHeader: string = "Content-Range"
): DataProvider => ({
  getList: (resource, params) => {
    const token = localStorage.getItem("accessToken");
    const { page, perPage } = params.pagination;
    let { field, order } = params.sort;
    field = field == "id" ? "_id" : field;
    const rangeStart = (page - 1) * perPage;
    const rangeEnd = page * perPage - 1;

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([rangeStart, rangeEnd]),
      filter: JSON.stringify(filterTransform(params.filter)),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const options =
      countHeader === "Content-Range"
        ? {
            // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
            headers: new Headers({
              Range: `${resource}=${rangeStart}-${rangeEnd}`,
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
            }),
          }
        : { "Access-Control-Allow-Origin": "*" };

    return httpClient(url, options).then(({ headers, json }) => {
      if (!headers.has(countHeader)) {
        throw new Error(
          `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
        );
      }
      return {
        data: json.map((resource) => ({ ...resource, id: resource._id })),
        total:
          countHeader === "Content-Range"
            ? parseInt(headers.get("content-range").split("/").pop(), 10)
            : parseInt(headers.get(countHeader.toLowerCase())),
      };
    });
  },

  getOne: (resource, params) => {
    const token = localStorage.getItem("accessToken");
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    };
    return httpClient(`${apiUrl}/${resource}/${params.id}`, options).then(
      ({ json }) => ({
        data: { ...json, id: json._id },
      })
    );
  },

  getMany: (resource, params) => {
    const token = localStorage.getItem("accessToken");
    const query = {
      filter: JSON.stringify({ _id: params.ids }),
    };
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url, options).then(({ json }) => ({
      data: json.map((resource) => ({ ...resource, id: resource._id })),
    }));
  },

  getManyReference: (resource, params) => {
    const token = localStorage.getItem("accessToken");
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const rangeStart = (page - 1) * perPage;
    const rangeEnd = page * perPage - 1;

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const options =
      countHeader === "Content-Range"
        ? {
            // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
            headers: new Headers({
              Range: `${resource}=${rangeStart}-${rangeEnd}`,
              Authorization: `Bearer ${token}`,
            }),
          }
        : {
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
          };

    return httpClient(url, options).then(({ headers, json }) => {
      if (!headers.has(countHeader)) {
        throw new Error(
          `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
        );
      }
      return {
        data: json.map((resource) => ({ ...resource, id: resource._id })),
        total:
          countHeader === "Content-Range"
            ? parseInt(headers.get("content-range").split("/").pop(), 10)
            : parseInt(headers.get(countHeader.toLowerCase())),
      };
    });
  },

  update: (resource, params) => {
    const token = localStorage.getItem("accessToken");
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    };
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
      ...options,
    }).then(({ json }) => ({ data: { ...json, id: json._id } }));
  },

  // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
  updateMany: (resource, params) => {
    const token = localStorage.getItem("accessToken");
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    };
    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
          ...options,
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) }));
  },


  create: (resource, params) => {
    const token = localStorage.getItem("accessToken");
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    };
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      ...options,
    }).then(({ json }) => ({ data: { ...json, id: json._id } }));
  },

  /* 
  create: (resource, params) => {
    const token = localStorage.getItem("accessToken");
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    };
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      ...options,
    }).then(({ json }) => ({ data: { ...params.data, id: json._id } }));
  },
 */
  delete: (resource, params) => {
    const token = localStorage.getItem("accessToken");
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "text/plain",
        Authorization: `Bearer ${token}`,
      }),
    }).then(({ json }) => ({ data: { ...json, id: json._id } }));
  },

  // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: (resource, params) => {
    const token = localStorage.getItem("accessToken");
    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
          }),
        })
      )
    ).then((responses) => ({
      data: responses.map(({ json }) => json.id),
    }));
  },
  //custom method for raw get, post
  customMethod: (resource, params, method) => {
    const token = localStorage.getItem("accessToken");
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      }),
    };
    if (method === "GET") {
      const query = {
        filter: JSON.stringify(filterTransform(params.filter)),
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      return httpClient(url, options).then(({ json }) => ({
        data: json,
      }));
    } else if (method === "POST") {
      return httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params.data),
        ...options,
      }).then(({ json }) => ({ data: params.data, result: json }));
    } else return Promise.reject("Method is not supported");
  },
});
