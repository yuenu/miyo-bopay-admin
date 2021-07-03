properties([
    parameters([
        booleanParam(description: 'SKIP test', name: 'SKIP_TEST', defaultValue: false)
    ])
])

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
    def registry = env.DOCKER_REGISTRY
    def registryCred = env.DOCKER_REGISTRY_CREDS
    def tag = "1.0.${env.BUILD_NUMBER}-pre"

    stage('checkout') {
        checkout scm
    }

    stage('test') {
        if (params.SKIP_TEST) {
            echo "Skip test."
        } else {
            echo "Test."
        }
    }

    stage('merge into master') {
        sshagent([GIT_CRED]) {
            sh """
            set -ex
            echo "Pass test, merge to master"
            git checkout master
            git pull
            git merge origin/dev
            git push origin master
            git status
            git rev-parse --short HEAD
            """
        }
    }

    stage('pull spinach/web/server') {
        docker.withRegistry(registry, registryCred) {
            image = docker.image('spinach.azurecr.io/spinach/web/server:latest')
            image.pull()
        }
    }

    stage('build bopay-admin') {
        images["admin"] = docker.build("bopay/admin", "--build-arg ENV=dev .")
    }

    stage('push bopay-admin image') {
        docker.withRegistry(registry, registryCred) {
            for (name in images.keySet()) {
                images[name].push(tag)
            }
        }
    }

    stage('release') {
        build wait: false, job: 'pre/release', parameters: [
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