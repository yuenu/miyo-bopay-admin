node('web-builder') {
    try {
        pipeline()
        success()
    } catch (e) {
        failure(e)
        throw e
    } finally {
        def currentResult = currentBuild.result ?: 'SUCCESS'
        if (currentResult == 'UNSTABLE') {
            unstable()
        }
        def previousResult = currentBuild.previousBuild?.result
        if (previousResult != null && previousResult != currentResult) {
            changed()
        }
        always()
    }
}

def pipeline() {
    def images = [:]
    def REGISTRY_URL = "https://spinach.azurecr.io"
    def REGISTRY_CRED = "acr-poweruser"
    def tag = "1.0.${env.BUILD_NUMBER}"

    stage('checkout') {
        checkout scm
    }

    stage('pull spinach/web/server') {
        docker.withRegistry(REGISTRY_URL, REGISTRY_CRED) {
            image = docker.image('spinach.azurecr.io/spinach/web/server:latest')
            image.pull()
        }
    }

    stage('build bopay-admin') {
        images["admin"] = docker.build("bopay/admin", "--build-arg ENV=prod .")
    }

    stage('push bopay-admin image') {
        docker.withRegistry(REGISTRY_URL, REGISTRY_CRED) {
            for (name in images.keySet()) {
                images[name].push(tag)
            }
        }
    }

    stage('release') {
        build wait: false, job: 'bopay/release', parameters: [
            string(name: 'TAG', value: tag),
            string(name: 'IMAGES', value: 'bopay/admin')
        ]
    }
}

def failure(e) {
    echo "error ${e}"
    telegramSend(message: "${env.JOB_NAME} has failed because ${e}\nSee ${env.BUILD_URL}console", chatId: "${env.TG_CHAT_ID}")
}

def success() {
    echo "success"
}

def unstable() {
    echo 'This will run only if the run was marked as unstable'
}

def changed() {
    echo 'This will run only if the state of the Pipeline has changed'
    echo 'For example, if the Pipeline was previously failing but is now successful'
}