IMAGE=harbor.liebi.com/salp-polkadot/bifrost-subql:v1.6
DEPLOYMENT="salp1-bifrost-subql salp2-bifrost-subql salp3-bifrost-subql salp4-bifrost-subql salp5-bifrost-subql"

build:
	docker build -f Dockerfile -t ${IMAGE} .
	docker push ${IMAGE}

deploy: build
	kubectl set image deploy -n salp-polkadot salp1-polkadot-bifrost-subql salp1-polkadot-bifrost-subql=${IMAGE}
	kubectl set image deploy -n salp-polkadot salp2-polkadot-bifrost-subql salp2-polkadot-bifrost-subql=${IMAGE}
	kubectl set image deploy -n salp-polkadot salp3-polkadot-bifrost-subql salp3-polkadot-bifrost-subql=${IMAGE}
	kubectl set image deploy -n salp-polkadot salp4-polkadot-bifrost-subql salp4-polkadot-bifrost-subql=${IMAGE}
	kubectl set image deploy -n salp-polkadot salp5-polkadot-bifrost-subql salp5-polkadot-bifrost-subql=${IMAGE}

update: deploy
	kubectl rollout restart  deploy -n salp-polkadot salp1-polkadot-bifrost-subql salp2-polkadot-bifrost-subql salp3-polkadot-bifrost-subql salp4-polkadot-bifrost-subql salp5-polkadot-bifrost-subql