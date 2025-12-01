pipeline {
    agent any

    stages {

        stage('Install Python Deps') {
            steps {
                sh 'pip install -r requirements.txt'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'pytest -v'
            }
        }

        stage('Install Cypress') {
            steps {
                dir('frontend') {
                    sh 'npm install cypress --save-dev'
                }
            }
        }

        stage('Serve Frontend') {
            steps {
                sh 'nohup python3 -m http.server 8080 --directory frontend &'
                sh 'sleep 3'
            }
        }

        stage('Run Cypress') {
            steps {
                dir('frontend') {
                    sh 'npx cypress run'
                }
            }
        }
    }

    post {
        always {
            sh 'pkill -f "http.server" || true'
        }
    }
}
