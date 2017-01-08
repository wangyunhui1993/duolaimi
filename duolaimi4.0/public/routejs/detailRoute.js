/**
 * Created by lx on 2016/11/10.
 */
angular.module('myDetailApp',[])
    .controller('myDetailController',['$scope','$location','$http',function($scope,$location,$http){
        $scope.search=window.location.search.split('?')[1];
        console.log($scope.search);
        //$scope.blob = new Blob([$scope.search], {type: 'text/plain'});
        //console.log($scope.blob);
        $scope.result='';
        $scope.num=1;
        $scope.mine={
            bigImg:'',
            price:'',
            quantity:'',
            commodityProperty:[],
            height:'',
            colorImages:colorImages
        };
        function colorImages(index){
            //console.log(index);
            $scope.mine.bigImg=$scope.result.commodityColorImages[index];
            $scope.mine.price=$scope.result.commodityPrice[index];
            $scope.mine.quantity=$scope.result.commodityQuantity[index];
        }
        var proArr=['commodityType', 'commodityNum', 'commodityBrand', 'commodityCollarType', 'commodityPlacket', 'commodityLiningSort', 'commodityTexture', 'commodityAppleTocrowd', 'commodityStyle', 'commodityTypeVersion', 'commoeityThicknessOrThin', 'commodityPocketStyle', 'commodityPattern', 'commodityApplyToSeason', 'applyToAge'];
        var proArrChina=['宝贝类型','货号','品牌','领型','衣门襟','面料','材质','适用对象','风格','版型','厚薄','口袋样式','图案','适用季节','适用年龄'];
        $http({
            method:'post',
            url:'/detail',
            data:{_id:$scope.search}
        }).success(function(result){
                $scope.result=result[0];
                console.log($scope.result);
                $scope.mine.bigImg=$scope.result.commodityImages[0];
                $scope.mine.price=$scope.result.commodityPrice[0];
                $scope.mine.quantity=$scope.result.commodityQuantity[0];
            for(var i=0;i<proArr.length;i++){
                if(result[0][proArr[i]]!=undefined&&result[0][proArr[i]]!=''){
                    //console.log(result[0][proArr[i]]);
                    $scope.mine.commodityProperty.push(proArrChina[i]+':'+result[0][proArr[i]]);
                }
            }
        })
            .error(function(err){
                console.log(err);
            });
        $scope.mine.height=function(index){

        }
    }]);