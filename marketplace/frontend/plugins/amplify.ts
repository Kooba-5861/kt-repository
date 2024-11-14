import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

export default defineNuxtPlugin(nuxtApp => {
  Amplify.configure(outputs);
  if (outputs.custom && outputs.custom.API) {
    const existingConfig = Amplify.getConfig();
    // existingConfig と outputs.custom.API をマージする
    const mergedConfig = {
      ...existingConfig,
      API: {
        ...existingConfig.API,
        REST: outputs.custom.API,
      },
    }
    Amplify.configure(mergedConfig);
  }
});
