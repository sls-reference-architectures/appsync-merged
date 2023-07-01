# appsync-merged

A canonical merged AppSync API

Demonstrates the minimum CloudFormation required to configure and deploy an AppSync API of type `Merged`.
As of this writing, serverless-appsync-plugin does not support this kind of setup. I imagine it will in the future.

The structure of the application is loosely based on the example in [this AWS tutorial](https://youtu.be/LP8n5bYuiPA) on AppSync Merged APIs. In it, there are three AppSync APIs: Orders, Users, and the Merged (or Unified) version of the other two.
