pipeline {
    agent any

    stages {

        stage('Install Python Dependencies') {
            steps {
                sh '''
                    /usr/bin/pip3 install --upgrade pip
                    /usr/bin/pip3 install -r requirements.txt
                '''
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh '''
                    /usr/bin/python3 -m pytest -v
                '''
            }
        }

        stage('Install Node Dependencies') {
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
            steps {
                sh '''
                    nohup /usr/bin/python3 -m http.server 8080 --directory frontend &
                    sleep 2
                '''
            }
        }

        stage('Run Cypress Tests') {
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
