# homebaseai/intercom-api

This is plain JavaScript API for [Intercom](https://www.intercom.com/). It is
utilized by the other vue packages in this repository.

 - [@HomebaseAI/vue3-intercom](https://www.npmjs.com/package/@homebaseai/vue3-intercom)
 - [@HomebaseAI/vue2-intercom](https://www.npmjs.com/package/@homebaseai/vue2-intercom)

## Installation

```sh
npm i @homebaseai/intercom-api
```

## Usage

```ts
import * as intercom from '@homebaseai/intercom-api';

// Install intercom will attach intercom to the window
// and create the script tags on the document.
intercom.installIntercom({ app_id: 'intercom_id' });

// first boot it.
intercom.boot({
  app_id: import.meta.env.VITE_APP_INTERCOM_TOKEN,
  user_id: 1,
  name: 'John Doe',
  email: 'john@exampl.com',
});

// then do whatever...
intercom.show();
```

---

# API Methods

All of the methods [covered here](https://developers.intercom.com/installing-intercom/docs/intercom-javascript), are supported.

