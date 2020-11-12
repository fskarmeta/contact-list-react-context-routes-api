const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiURL: "https://assets.breatheco.de/apis/fake/contact",
			contact: null,
			contacts: null,
			agenda: "fskarmeta"
		},
		actions: {
			loadMyAgendaFromAgendas: () => {
				const store = getStore();
				fetch(`${store.apiURL}/agenda/${store.agenda}`)
					.then(resp => resp.json())
					.then(data => {
						setStore({
							contacts: data
						});
					});
			},
			addContact: data => {
				const store = getStore();
				fetch(store.apiURL + "/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						console.log(resp);
						return resp.json();
					})
					.then(data => {
						getActions().loadMyAgendaFromAgendas();
					});
			},
			editContact: (urlID, data) => {
				const store = getStore();
				fetch(store.apiURL + urlID, {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().loadMyAgendaFromAgendas();
					});
			},
			deleteContact: urlID => {
				const store = getStore();
				fetch(store.apiURL + urlID, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().loadMyAgendaFromAgendas();
					});
			}
		}
	};
};

export default getState;
