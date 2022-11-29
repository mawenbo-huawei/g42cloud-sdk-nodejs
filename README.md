<p align="center">
<a href="https://www.g42cloud.com/"><img style="background-color:black;" width="450px" height="102px" src="https://auth.g42cloud.com//authui/20220614193554/public/custom/images/logo.svg"></a>
</p>

<h1 align="center">G42 Cloud Node.js Software Development Kit (Node.js SDK)</h1>

The G42 Cloud Node.js SDK allows you to easily work withG42 Cloud services such as Elastic Compute Service (ECS)
and Virtual Private Cloud (VPC) without the need to handle API related tasks.

This document introduces how to obtain and use G42 Cloud Node.js SDK.

## Requirements

- To use G42 Cloud Node.js SDK, you must have G42 Cloud account as well as the Access Key (AK) and Secret key (SK) of the
  G42 Cloud account. You can create an Access Key in the G42 Cloud console.

- To use G42 Cloud Node.js SDK to access the APIs of specific service, please make sure you do have activated the
  service in [G42 Cloud console](https://console.g42cloud.com/console/) if needed.

- G42 Cloud Node.js SDK requires **Node 10.16.1** or later.

## Install Node.js SDK

The recommended way to install SDK is with npm.

You must depended on `@huaweicloud/huaweicloud-sdk-core` library no matter which product/service development kit you
need to use. Take using VPC SDK for example, you need to install `@g42cloud/g42cloud-sdk-vpc` library:

``` bash
npm install @huaweicloud/huaweicloud-sdk-core
npm install @g42cloud/g42cloud-sdk-vpc
```

## Code Example

- The following example shows how to query VPCs, you need to substitute your real `{Service}Client`
  for `VpcClient` in actual use.
- Substitute the values for `{your ak string}`, `{your sk string}`, `{your endpoint}`, `{your project id}`.

``` javascript
// index.js
const core = require('@huaweicloud/huaweicloud-sdk-core');
const vpc = require('@g42cloud/huaweicloud-sdk-vpc');

const ak = '<YOUR AK>';
const sk = '<YOUR SK>';
const endpoint = 'https://vpc.ae-ad-1.g42cloud.com';
const project_id = '<YOUR_PROJECT_ID>';

const credentials = new core.BasicCredentials()
  .withAk(ak)
  .withSk(sk)
  .withProjectId(project_id);
const client = vpc.VpcClient.newBuilder()
  .withCredential(credentials)
  .withEndpoint(endpoint)
  .build();
const request = new vpc.ListVpcsRequest();
const result = await client.listVpcs(request);
result
  .then((result) => {
    console.log('JSON.stringify(result)::' + JSON.stringify(result));
  })
  .catch((ex) => {
    console.log('exception:' + JSON.stringify(ex));
  });

```

- Debug the example above

``` bash
# Run command：
node index.js
```

## Online Debugging

[API Explorer](https://console.g42cloud.com/apiexplorer) provides api retrieval and online debugging, supports full fast retrieval, visual debugging, help document viewing, and online consultation.

## Changelog

Detailed changes for each released version are documented in
the [CHANGELOG.md](https://github.com/g42cloud-sdk/g42cloud-sdk-nodejs/blob/master/CHANGELOG.md).

## User Manual [:top:](#g42-cloud-nodejs-software-development-kit-nodejs-sdk)

* [1. Client Configuration](#1-client-configuration-top)
    * [1.1  Default Configuration](#11-default-configuration-top)
    * [1.2  Network Proxy](#12-network-proxy-top)
    * [1.3  SSL Certification](#13-ssl-certification-top)
* [2. Credentials Configuration](#2-credentials-configuration-top)
    * [2.1  Use Permanent AK&SK](#21-use-permanent-aksk-top)
    * [2.2  Use Temporary AK&SK](#22-use-temporary-aksk-top)
* [3. Client Initialization](#3-client-initialization-top)
    * [3.1  Initialize client with specified Endpoint](#31-initialize-the-serviceclient-with-specified-endpoint-top)
* [4. Send Request and Handle response](#4-send-requests-and-handle-responses-top)
* [5. Troubleshooting](#5-troubleshooting-top)
    * [5.1  Original HTTP Listener](#51-original-http-listener-top)

### 1. Client Configuration [:top:](#user-manual-top)

#### 1.1 Default Configuration [:top:](#user-manual-top)

``` javascript
// Use default configuration
const client = VpcClient.newBuilder()
```

#### 1.2 Network Proxy [:top:](#user-manual-top)

``` javascript
// Use proxy if needed
client.withProxyAgent("http://username:password@xxx.com:8080")
```

#### 1.3 SSL Certification [:top:](#user-manual-top)

``` javascript
// Skip SSL certification checking while using https protocol if needed
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
```

### 2. Credentials Configuration [:top:](#user-manual-top)

There are two types of G42 Cloud services, `regional` services and `global` services.

For `Regional` services' authentication, projectId is required. 

For `global` services' authentication, domainId is required.

`Parameter description`:

- `ak` is the access key ID for your account.
- `sk` is the secret access key for your account.
- `projectId` is the ID of your project depending on your region which you want to operate.
- `domainId` is the account ID of G42 CLOUD.
- `securityToken` is the security token when using temporary AK/SK.

You could use permanent AK plus SK **or** use temporary AK plus SK plus SecurityToken to complete credentials'
configuration.

#### 2.1 Use Permanent AK&SK [:top:](#user-manual-top)

``` javascript
// Regional Services
const basicCredentials = new BasicCredentials()
    .withAk(ak)
    .withSk(sk)
    .withProjectId(projectId)

// Global Services
const globalCredentials = new GlobalCredentials()
    .withAk(ak)
    .withSk(sk)
    .withDomainId(domainId)
```

#### 2.2 Use Temporary AK&SK [:top:](#user-manual-top)

It's required to obtain temporary AK&SK and security token first, which could be obtained through
permanent AK&SK or through an agency.

- Obtaining a temporary access key and security token through token, you could refer to document: https://docs.g42cloud.com/api/iam/en-us_topic_0097949518.html. The API mentioned in the document above
  corresponds to the method of `CreateTemporaryAccessKeyByToken` in IAM SDK.

``` javascript
// Regional Services
const basicCredentials = new BasicCredentials()
    .withAk(ak)
    .withSk(sk)
    .withSecurityToken(securityToken)
    .withProjectId(projectId)

// Global Services
const globalCredentials = new GlobalCredentials()
    .withAk(ak)
    .withSk(sk)
    .withSecurityToken(securityToken)
    .withDomainId(domainId)
```

### 3. Client Initialization [:top:](#user-manual-top)

#### 3.1 Initialize the {Service}Client with specified Endpoint [:top:](#user-manual-top)

``` javascript
const client = VpcClient.newBuilder()
    .withCredential(globalCredentials)
    .withEndpoint(endpoint)
    .withProxyAgent(proxy)
    .build()
```

**where:**

- `endpoint` is the service specific endpoints,
  see [Regions and Endpoints](https://docs.g42cloud.com/endpoint/index.html).

### 4. Send Requests and Handle Responses [:top:](#user-manual-top)

``` javascript
const result = client.showJobDetail(new ShowJobDetailRequest("id"));
result.then(result => {
    res.send("JSON.stringify(result)::" + JSON.stringify(result))
}).catch(ex => {
    res.send("exception:" + JSON.stringify(ex))
});
```

### 5. Troubleshooting [:top:](#user-manual-top)

#### 5.1 Original HTTP Listener [:top:](#user-manual-top)

In some situation, you may need to debug your http requests, original http request and response information will be
needed. The SDK provides a listener function to obtain the original encrypted http request and response information.

> :warning:  Warning: The original http log information is used in debugging stage only, please do not print the original http header or body in the production environment. This log information is not encrypted and contains sensitive data such as the password of your ECS virtual machine, or the password of your IAM user account, etc. When the response body is binary content, the body will be printed as "***" without detailed information.

Set the environment variable __process.env.DEBUG__ to enable debug log printing.
