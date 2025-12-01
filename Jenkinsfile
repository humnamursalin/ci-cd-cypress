pipeline {
    agent any

    stages {

        stage('Install Python Dependencies') {
            steps {
                sh '''
                    python3 -m venv venv
                    . venv/bin/activate
                    pip install -r requirements.txt
                '''
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh '''
                    . venv/bin/activate
                    export PYTHONPATH=$(pwd)
                    pytest -v
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
                    nohup python3 -m http.server 8899 --directory frontend &
                    sleep 2
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
               dir('frontend') {
                    sh '''
                        npx cypress install
                        npx cypress run
                    '''
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
