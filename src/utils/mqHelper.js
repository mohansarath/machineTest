const amqp = require('amqplib/callback_api');

const MQ_URI = process.env.MQURI;

let ch = amqp.Channel

amqp.connect(MQ_URI, (errConn, conn) => {
    if (errConn) {
        console.log('url:::', MQ_URI);
        console.log('MQ ConnErr', errConn)
        return
    }

    conn.createChannel((errCh, channel) => {
        if (errCh) {
            console.log('MQ ChErr', errCh)
            return
        }
        ch = channel
    })
})

const publishToQueue = (queueName, data) => {
    ch.sendToQueue(queueName, Buffer.from(data))
}



const publishNewsletterQueue = data => publishToQueue('newsletter', data)

const publishRetryNewsletterQueue = data =>
    publishToQueue('parking-lot-queue', data)

process.on('exit', code => {
    ch.close(err => {
        console.log('Error Closing message channel', err)
    })
    console.log('Closing message channel', code)
})

const consumeNewsletterQueue = async () => {
    amqp.connect(MQ_URI, (errConn, conn) => {
        if (errConn) {
            console.log('MQ ConnErr', errConn)
            return
        }

        conn.createChannel((errCh, ch) => {
            if (errCh) {
                console.log('MQ ChErr', errCh)
                return
            }

            const queueName = 'newsletter'

            ch.consume(queueName, message => {
                try {
                    // sendEmail
                    console.log('message:::::',message.content)
                }
                catch (err) {
                    // OnError
                    publishRetryNewsletterQueue(err)
                }
            }),
            {
                noAck: true
            }
        })
    })
}

const consumeRetryNewsletterQueue = async queueName => {
    amqp.connect(MQ_URI, (errConn, conn) => {
        if (errConn) {
            console.log('MQ ConnErr', errConn)
            return
        }

        conn.createChannel((errCh, ch) => {
            if (errCh) {
                console.log('MQ ChErr', errCh)
                return
            }
            queueName = 'parking-lot-queue'

            ch.consume(queueName, message => {
                try {
                    console.log('msg:::::',message.content)
                }
                catch (err) {
                    console.log(err);
                }

            }),
            {
                noAck: true
            }
        })
    })
}


module.exports = {
    publishNewsletterQueue,
    publishRetryNewsletterQueue,
    consumeNewsletterQueue,
    consumeRetryNewsletterQueue,
}
