module = angular.module("Prova", []);

module.controller("DisciplinaController", ["$scope","$http", DisciplinaController]);

function  DisciplinaController($scope,$http){
    $scope.iniciar = funcaoIniciar();
    
    $scope.salvar = funcaoSalvar;
    $scope.excluir = funcaoExcluir;
    $scope.editar = funcaoEditar;
    
    $scope.disciplinas = [];
    $scope.disciplina = {};
    $scope.isNovo = true;
    
    function funcaoEditar(vitima) {
        $scope.disciplina = angular.copy(vitima);
        $scope.isNovo = false;
        $http.put("/Disciplinas",$scope.disciplina);
        funcaoCarregar();
        
    }

    
    function funcaoExcluir(vitima) {
        $http.delete("/Disciplinas/"+vitima.id);
        funcaoCarregar();
        
    }
    
    function funcaoSalvar() {
      
        $http.post("/Disciplinas",$scope.disciplina).success(onSuccess).error(onError);
        
        function onSuccess(data,Status){
            $scope.disciplinas = data;
            console.log(data);
        }
        function onError(data,status){
            alert("deu erro "+data);
            console.log(data);
        }
        funcaoCarregar();
    }
    
    
    function funcaoCarregar() {
        $http.get("/Disciplinas").success(onSuccess).error(onError);
        
        function onSuccess(data, status) {
            $scope.disciplinas = data;       
            console.log(data);
        }
        function onError(data, status) {
            alert("Deu erro: " + data);
        }
    }
    
    function funcaoIniciar() {
        
        funcaoCarregar();
        console.log(">>> Carregando Disciplinas....");
    }
}