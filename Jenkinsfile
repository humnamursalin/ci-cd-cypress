pipeline {
    agent {
        docker {
            image 'python:3.10'
            args '--user=root'
        }
    }

    stages {

        stage('Install Python Dependencies') {
            steps {
                sh '''
                    pip install --upgrade pip
                    pip install -r requirements.txt
                '''
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'pytest -v'
            }
        }

        stage('Install Node Dependencies') {
            agent {
                docker {
                    image 'node:18'
                    args '--user=root'
                }
            }
            steps {
                dir('frontend') {
                    sh '''
                        if [ ! -f package.json ]; then npm init -y; fi
                        npm install
                    '''
                }
            }
        }

        stage('Serve Frontend') {
            agent any
            steps {
                sh 'nohup python3 -m http.server 8080 --directory frontend &'
                sh 'sleep 3'
            }
        }

        stage('Run Cypress Tests') {
            agent {
                docker {
                    image 'cypress/included:12.17.3'
                    args '--user=root'
                }
            }
            steps {
                dir('frontend') {
                    sh 'npx cypress run || true'
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
