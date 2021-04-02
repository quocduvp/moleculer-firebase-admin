const FirebaseMixins = require('moleculer-firebase-admin')
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