
import axios from 'axios'
import VueAxios from 'vue-axios'
require('../../config.js');

const productUnits = {

	namespaced:true,

	state: {
		productUnits : []
	}
	,

	mutations: {
		setProductUnits(state,units){

			state.productUnits=units

		}
	},

	actions: {
		async getProductUnits({commit,state}){

			await axios.get(config.server_url+'productUnits').then((response)=>{
				commit('setProductUnits',response.data.body);
			}).catch((e)=>{
				commit('setProductUnits',state.productUnits)
			})
	
		},
		async addUnit({commit,dispatch},unit){
			var body = {
				unit:unit
				
				
			}
			var tail = {
				headers:{
					"Access-Control-Allow-Origin": "*"
				}
			}
			var response = await axios.post(config.server_url+'productUnits',body,tail).then((response)=>{
				dispatch('getProductUnits');
				return response;
			});
			return response;
		},
		async deleteUnit({dispatch},unit_id){
			var response = await axios.delete(config.server_url+'productUnits/'+unit_id).then((response)=>{
				dispatch('getProductUnits');
					return response;
			})
			return response;
		},
		async updateUnit({dispatch},{name,id}){
	

			var tail = {
				headers:{
					"Access-Control-Allow-Origin": "*"
				}
			}
			var response = await axios.put(config.server_url+'productUnits/'+id,{'name':name},tail).then((response)=>{
				dispatch('getProductUnits');
				return response;
			})
			return response;
		}
	},

	getters: {

	}
}
export default productUnits;