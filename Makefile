IMAGE=hkccr.ccs.tencentyun.com/salp/bifrost-subql:v1.6
DEPLOYMENT="salp1-bifrost-subql salp2-bifrost-subql salp3-bifrost-subql salp4-bifrost-subql salp5-bifrost-subql"

build:
	docker build -f Dockerfile -t ${IMAGE} .
	docker push ${IMAGE}

deploy: build
	kubectl set image deploy -n salp salp1-bifrost-subql salp1-bifrost-subql=${IMAGE}
	kubectl set image deploy -n salp salp2-bifrost-subql salp2-bifrost-subql=${IMAGE}
	kubectl set image deploy -n salp salp3-bifrost-subql salp3-bifrost-subql=${IMAGE}
	kubectl set image deploy -n salp salp4-bifrost-subql salp4-bifrost-subql=${IMAGE}
	kubectl set image deploy -n salp salp5-bifrost-subql salp5-bifrost-subql=${IMAGE}

update: deploy
	kubectl rollout restart  deploy -n salp salp1-bifrost-subql salp2-bifrost-subql salp3-bifrost-subql salp4-bifrost-subql salp5-bifrost-subql