pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                nodejs('Node-18.18.2'){
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                nodejs('Node-18.18.2'){
                    sh 'npm run test'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sshagent(['ssh-agent']){
                    sh 'ssh -tt -o StrictHostKeyChecking=no fikretcnsl@95.173.186.111 bash ./jenkinsscript.sh'
                }
            }
        }
    }
}
