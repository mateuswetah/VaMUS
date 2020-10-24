import { tainacanApi, mapasApi } from '../../axios'

export const fetchInstituteAbout = ({ commit }: any, instituteId: string) => new Promise((resolve, reject) => {
    const fields = [
        'id',
        'name',
        'shortDescription',
        'location',
        'mus_cod',
        'location.*',
        'num_sniic',
        'shortDescription',
        'esfera',
        'esfera_tipo',
        'mus_instituicaoMantenedora',
        'En_Nome_Logradouro',
        'En_Bairro',
        'En_Municipio',
        'En_Estado',
        'endereco',
        'site',
        'mus_tipo_tematica',
        'facebook',
        'instagram'
    ];
    const endpoint = `/space/find?id=eq(${instituteId})&@select=${fields.join(',')}&@files=(avatar,header):name,url`;
    mapasApi.get(endpoint).then(res => {
        const institute = (Array.isArray(res.data) ? res.data[0] : res.data);
        Object.keys(institute).forEach(e => { if( !['@files:avatar', '@files:header'].includes(e) && !fields.includes(e)) delete institute[e]} )
        console.log(institute);
        commit('setInstitute', institute);
        resolve({institute});
    }).catch(error => {
        console.error(error);
        reject(error);
    });
});


export const fetchInstituteEvents = ({ commit }: any, instituteId: string) => new Promise((resolve, reject) => {
    const fields = ['id','name','readableOccurrences'];
    const endpoint = `/event/findBySpace?spaceId=${instituteId}&@select=${fields.join(',')}`;
    mapasApi.get(endpoint).then(res => {
        const events = res.data;
        commit('setInstituteEvent', events);
        resolve({events});
    }).catch(error => {
        console.error(error);
        reject(error);
    });
});

export const fetchInstitute = ({ commit }: any) => {
    return new Promise((resolve, reject) => { 
        const endpoint = '/collections';

        tainacanApi.get(endpoint)
            .then(res => {
                const collections = res.data;
                const totalCollections = res.headers['x-wp-total'];

                commit('setCollections', collections);
                commit('setTotalCollections', totalCollections);

                resolve({ collections, totalCollections });
            }) 
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

export const setPostqueryAttribute = () => { };