const admin = require("firebase-admin");

const initFirebaseHandler = (schema) => {
    schema.methods = {
        ...schema.methods,
        firebase: () => admin,
    }
    schema.actions = {
        ...schema.actions,
        sendToDevice: {
            params: {
                registrationTokens: ["string|required", "array|items:string"],
                payload: "object|required",
                options: "object|optional"
            },
            async handler(ctx) {
                const {
                    registrationTokens,
                    payload,
                    options
                } = ctx.params;
                const response = await admin.messaging().sendToDevice(
                    registrationTokens,
                    payload,
                    options
                )
                return response
            }
        },
        subscribeToTopic: {
            params: {
                registrationTokens: ["string|required", "array|items:string"],
                topic: "string|required",
            },
            async handler(ctx) {
                const {
                    registrationTokens,
                    topic
                } = ctx.params;
                const response = await admin.messaging().subscribeToTopic(
                    registrationTokens,
                    topic
                )
                return response
            },
        },
        unsubscribeFromTopic: {
            params: {
                registrationTokens: ["string|required", "array|items:string"],
                topic: "string|required",
            },
            async handler(ctx) {
                const {
                    registrationTokens,
                    topic
                } = ctx.params;
                const response = await admin.messaging().unsubscribeFromTopic(
                    registrationTokens,
                    topic
                )
                return response
            }
        },
    }
    return schema;
}

module.exports = {
  name: "firebase",
  events: {},
  methods: {},

  created() {
    const firebaseCridential = this.settings.firebaseCridential
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseCridential),
      });
    } else {
      admin.initializeApp();
    }
  },
  started() {
  },
  merged(schema) {
    initFirebaseHandler.bind(this)(schema);
  },
  stopped() {},
};
