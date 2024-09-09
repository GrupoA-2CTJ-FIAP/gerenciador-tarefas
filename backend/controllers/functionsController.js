const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const db = admin.firestore()
const ONE_DAY_MS = 24 * 60 * 60 * 1000

exports.notifyUpcomingTasks = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async context => {
    const now = new Date()
    const upcomingTasksSnapshot = await db
      .collection('atividades')
      .where('endDate', '<=', new Date(now.getTime() + ONE_DAY_MS))
      .where('endDate', '>', now)
      .get()

    const messages = []

    upcomingTasksSnapshot.forEach(doc => {
      const task = doc.data()

      if (task.assignedTo && task.status !== 'concluído') {
        messages.push({
          token: task.assignedTo,
          notification: {
            title: 'Tarefa Próxima do Prazo',
            body: `Sua tarefa "${task.description}" está próxima do prazo de conclusão.`
          }
        })
      }
    })

    // Enviar notificações
    if (messages.length > 0) {
      try {
        await admin.messaging().sendAll(messages)
        console.log('Notificações enviadas com sucesso.')
      } catch (error) {
        console.error('Erro ao enviar notificações:', error)
      }
    }
  })