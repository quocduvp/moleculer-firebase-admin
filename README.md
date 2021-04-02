# moleculer-firebase-admin
Easy to use firebase with moleculer!

# Install package

```
$ npm i moleculer-firebase-admin
```

# Example

```
// example.service.js

module.exports = {
    name: "example",
    mixins: [FirebaseMixins],

    settings: {
        firebaseCridential: require("../../keys/quiz-app-firebase.json") // required
    },
    
    actions: {
    }
}

```

## Implement actions
|actions|params|
|-|-|
|example.sendToDevice|registrationTokens, payload, options|
|example.subscribeToTopic|registrationTokens, topic|
|example.unsubscribeFromTopic|registrationTokens, topic|

## Internal methods

Call methods like to module [firebase-admin](https://www.npmjs.com/package/firebase-admin)


### example call internal method

```
module.exports = {
    name: "example",
    mixins: [FirebaseMixins],

    settings: {
        firebaseCridential: require("../../keys/quiz-app-firebase.json") // required
    },
    
    actions: {
        sendNotificationToUser: {
            async handler(ctx) {
                const { registrationToken, payload } = ctx.params;
                const result = await this.firebase().messaging().sendToDevice(
                    registrationToken, payload
                )
                return result;
            }
        }
    }
}

```