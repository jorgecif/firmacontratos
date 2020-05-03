var app = angular.module('lists', ['ngAnimate']);

app.controller('PatientController', function($scope, $timeout, alertService) {
        $scope.newPatient = new Object();

        $scope.patientList = [
            {name : "Juan Pedro",
             lastname: "Carrillo",
             birthdate: "23-04-1928"},
            {name : "Barbara",
             lastname: "Herrera",
             birthdate: "16-07-1957"},
            {name : "Daniela",
             lastname: "Arias",
             birthdate: "25-12-1949"}
        ];
        
        $scope.patientSelected = undefined;
        $scope.addPatient = function (){
            if($scope.newPatient.name != undefined && $scope.newPatient.lastname != undefined) {
                $scope.patientList.push($scope.newPatient);
                $scope.newPatient = new Object();
                alertService.add("success", "Patient added!");
                $timeout(alertService.clear, 2500);
            }
        }

        $scope.deletePatient = function (index){
            if(JSON.stringify($scope.patientList[index]) === JSON.stringify($scope.patientSelected)){
                $scope.patientSelected = undefined;
            }
            $scope.patientList.splice(index, 1);
        }

        $scope.showPatientDetails = function(patient) {
            $scope.patientSelected = patient;
            $scope.patientDisplayed = patient;
        }
    });

app.factory('alertService', ['$rootScope', function ($rootScope) {
        var alertService;
        $rootScope.alerts = [];
        return alertService = {
            add: function(type, msg) {
                return $rootScope.alerts.push({
                    type: type,
                    msg: msg,
                    close: function() {
                        return alertService.closeAlert(this);
                    }
                });
            },
            closeAlert: function() {
                return $rootScope.alerts.splice(0, 1)
            },
            clear: function(){
                $rootScope.alerts = [];
            }
        };
    }]);