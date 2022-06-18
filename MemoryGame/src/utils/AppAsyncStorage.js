import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AppAsyncStorage  {

    /* ----------------------Retrieve the value from key from async storage.-----------------------*/
    static getValue(key) {
        return new Promise((getSuccess, getFail) => {
            AsyncStorage.getItem(key)
                .then(result => result)
                .then(result => {getSuccess(result);})
                .catch(error => getFail(error));
        });
    }

    /* ----------------------Save the value from key in async storage.-----------------------*/
    static setValue(key, value) {
        return new Promise((saveSuccess, saveFailure) => {
            AsyncStorage.setItem(key, value)
                .then(() => saveSuccess(true))
                .catch(error => saveFailure(error));
        });
    }

    /* ----------------------Delete the value from key in async storage.-----------------------*/
    static deleteValue(key) {
        return new Promise((deleteSuccess, deleteFailure) => {
            AsyncStorage.removeItem(key)
                .then(() => deleteSuccess(true))
                .catch(error => deleteFailure(error));
        });
    }

    /* ----------------------Update the value from key in async storage.-----------------------*/
    static updateValue(key, value) {
        return new Promise((updateSuccess, updateFailure) => {
            AsyncStorage.mergeItem(key, value)
                .then(() => updateSuccess(true))
                .catch(error => updateFailure(error));
        });
    }
}
