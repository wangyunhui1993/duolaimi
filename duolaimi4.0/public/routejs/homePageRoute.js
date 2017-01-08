/**
 * Created by lx on 2016/11/10.
 */
angular.module('myHomeApp',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('sort',{
                url:'/sort',
                abstract:true,
                templateUrl:'sort.html',
                controller:'sortController'
            })
            .state('myInformations',{
                url:'/myInformations',
                abstract:true,
                templateUrl:'myInformations.html'
                //controller:'myInformationsController'
            })
            //社区
            .state('community',{
                url:'/community',
                templateUrl:'community.html',
                controller:"communityController"
            })

            .state('sellerPage',{
                url:'/sellerPage',
                abstract:true,
                templateUrl:'sellerPage.html'
                //controller:"sellerPageController"
            })
            .state('purchasePage',{
                url:'/purchasePage',
                abstract:true,
                templateUrl:'purchasePage.html',
                controller:'purchasePageController'
            })
            .state('purchasePage.commodityDetail',{
                url:'/commodityDetail.html',
                templateUrl:'commodityDetail.html'
                //controller:'myCollectController'
            })
            .state('purchasePage.commodityComment',{
                url:'/commodityComment.html',
                templateUrl:'commodityComment.html'
                //controller:'myCollectController'
            })
            .state('sellerPage.test',{
                url:'/test',
                //controller:'newsController',
                templateUrl:'test.html'
            })
            .state('sellerPage.issuedCommodity',{
                url:'/issuedCommodity',
                //controller:'newsController',
                templateUrl:'issuedCommodity.html'
            })



            .state('myCollect',{
                url:'/myCollect',
                abstract:true,
                templateUrl:'myCollect.html'
                //controller:'myCollectController'
            })
            //商品收藏
            .state('myCollect.commodityCollection',{
                url:'/commodityCollection',
                templateUrl:'commodityCollection.html',
                controller:'commodityCollectionController'
            })
            //店铺收藏
            .state('myCollect.shopCollection',{
                url:'/shopCollection',
                templateUrl:'shopCollection.html'
                //controller:'shopCollectionController'
            })
            //购物车
            .state('shoppingCar',{
                url:'/shoppingCar',
                templateUrl:'shoppingCar.html',
                controller:'shoppingCarController'
            })
            .state('sort.sortShow',{
                url:'/sortShow',
                templateUrl:'sortShow.html'
                //controller:'sortShowController'
            })

            .state('sort.homePage',{
                url:'/homePage',
                controller:'homeController',
                templateUrl:'homePage.html'
            })
            .state('myInformations.tradeState',{
            url:'/tradeState',
            templateUrl:'tradeState.html',
            controller:'tradeStateController'
        })
            .state('myInformations.myAllOrder',{
            url:'/myAllOrder',
            templateUrl:'myAllOrder.html'
            //controller:'myAllOrderController'
        })
            .state('myInformations.haveShoppedStore',{
                url:'/haveShoppedStore',
                templateUrl:'haveShoppedStore.html'
                //controller:'haveShoppedStoreController'
            })
            .state('myInformations.myEvaluate',{
                url:'/myEvaluate',
                templateUrl:'myEvaluate.html'
                //controller:'myEvaluateController'
            })
            .state('myInformations.afterService',{
                url:'/afterService',
                templateUrl:'afterService.html'
                //controller:'afterServiceController'
            })
            .state('myInformations.personalData',{
                url:'/personalData',
                templateUrl:'personalData.html',
                controller:'personalDataController'
            })
            //添加收货地址
            .state('myInformations.deliverAddress',{
                url:'/deliverAddress',
                templateUrl:'deliverAddress.html',
                controller:'deliverAddressController'
            })

            .state('myInformations.photoUpLoad',{
                url:'/photoUpLoad',
                templateUrl:'photoUpLoad.html',
                controller:'photoUpLoadController'
            })
            //修改收货地址
            .state('myInformations.editAddress',{
                url:'/editAddress.html',
                templateUrl:'editAddress.html',
                controller:'editrAddressController'
            });

        $urlRouterProvider.otherwise('/sort/homePage');
    })
    .factory('allCommodity',['$http',function($http){
        return{
            getData:function(){
                return $http({
                    method:'post',
                    url:'http://localhost:8888/allCommodity'
                });

            }
        }
    }])
.controller('homeController',['$scope','allCommodity','$location',function($scope,allCommodity,$location){
    $scope.allCommodity='';
    allCommodity.getData()
        .success(function(result){
            console.log(result);
            $scope.allCommodity=result;
        })
        .error(function(err){

        });
    $scope.commodityDetail=function(index){
        console.log(index);
        window.location='/#/purchasePage/commodityDetail.html?'+$scope.allCommodity[index]._id;
    }
}])
    .controller('sortController',['$scope','$http',function($scope,$http){
        $scope.results='';
        $scope.commodityDetail=function(index){
            console.log(index);
            window.location='/#/purchasePage/commodityDetail.html?'+$scope.results[index]._id;
        }
        $scope.sort=function(arg){
            $http({
                method:'post',
                url:'/'+arg
            }).success(function(data){
                $scope.results=data;
                console.log($scope.results);

            }).error(function(){

                });
        }
    }])
    //购买页面
    .controller('purchasePageController',['$scope','$location','$http','$document',function($scope,$location,$http,$document){

    $scope.search=window.location.hash.split('?')[1];
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
            $scope.comment=function(){
                window.location='/#/purchasePage/commodityComment.html?'+$scope.search;
            }
            $scope.detail=function(){
                window.location='/#/purchasePage/commodityDetail.html?'+$scope.search;
            }

        })
        .error(function(err){
            console.log(err);
        });
    $scope.mine.height=function(index){

    }
        //加入收藏
        $scope.collect=function(){
            $http({
                method:'post',
                url:'http://localhost:8888/moveCollect',
                data:{userName:getUser(),
                id:$scope.result._id,
                    price:$scope.result.commodityPrice[0],
                    commodityImages:$scope.result.commodityImages[0],
                    commodityTitle:$scope.result.commodityTitle,
                    limitState:true
                }
            }).success(function(result){
                console.log(result);
               if(result){
                   $scope.result.collectionNum=parseInt($scope.result.collectionNum)+1;
               }
            });
        }
$scope.share=function(){
    var text=angular.element(document.querySelector('#textarea')).val();
    text=text+"<a href='#/purchasePage/commodityDetail.html?"+$scope.search+"'>"+$scope.result.commodityTitle+"</a>";
    var date=new Date();
    var  timer=date.toLocaleDateString();
    var Min=date.getMinutes();
    if(Min<10){
        Min='0'+Min;
    }
    timer=timer+"/"+date.getHours()+":"+Min;
    $http({
        method:'post',
        url:'http://localhost:8888/shareToCommunity',
        data:{userName:getUser(),
            id: $scope.search,
            content:text,
        commodityImages:[$scope.result.commodityImages[0]],
        shareTime:timer}
    }).success(function(result){

        if(result){
            angular.element(document.querySelector('.jumplog')).css({'display':'none'});
            angular.element(document.querySelector('#textarea')).val('');
        }
    });
}
}])
    //获取头像
    .controller('indexController',['$scope','$http',function($scope,$http){
        $scope.headImg='';
        if(getUser()!=null) {

            $scope.headImg='images/headImg/';
            $http({
                method:'post',
                url:'http://localhost:8888/headImg',
                data:{userName:getUser()}
            }).success(function(result){
                $scope.headImg+= result;
                console.log($scope.headImg);
            });
        }
    }])
   //交易状态
    .controller('tradeStateController',['$scope','$http',function($scope,$http){
        $scope.data='';
        $http({
            method:'post',
            url:'http://localhost:8888/tradeState',
            data:{userName:getUser()}
        }).success(function(result){
            console.log(result.headImg);
            $scope.data=result;
        });
    }])
    //获取个人信息
    .controller('personalDataController',['$scope','$http',function($scope,$http){
        //$scope.data='';
        //$http({
        //    method:'post',
        //    url:'http://localhost:8888/personalData',
        //    data:{userName:getUser()}
        //}).success(function(result){
        //    //console.log(result);
        //    $scope.data=result;
        //});
    }])
    .controller('photoUpLoadController',['$scope','$http',function($scope,$http){
        $scope.data='';
        $http({
            method:'post',
            url:'http://localhost:8888/photoUpLoad',
            data:{userName:getUser()}
        }).success(function(result){
            console.log(result);
            $scope.data=result;
        });
    }])
    //购物车
    .controller('shoppingCarController',['$scope','$http','$document',function($scope,$http,$document){
    $scope.data=[];
        $scope.limitData=[];      //失效商品
    $http({
        method:'post',
        url:'http://localhost:8888/shoppingCar',
        data:{userName:getUser()}
    }).success(function(result){
        console.log(result)
        for(var i=0;i<=result.length;i++){
            if(result[i].limitState==true){
                $scope.data.push(result[i]);
            }
            if(result[i].limitState==false){
                $scope.limitData.push(result[i]);
            }
        }
        console.log($scope.data);
        console.log( $scope.limitData);
        $scope.data=result;
    }).error(function(err){
            console.log(err)

        });
        $scope.commodityList=function(index){
            console.log(index);
            window.location='/#/purchasePage/commodityDetail.html?'+$scope.data[index].id;
        }
        $scope.limitcommodityList=function(index){
            console.log(index);
            window.location='/#/purchasePage/commodityDetail.html?'+$scope.limitData[index].id;
        }
        $scope.deleteCommodity=function(index){
            console.log(index);
            $http({
                method:'post',
                url:'http://localhost:8888/deleteShoppingCar',
                data:{_id: $scope.data[index]._id}
            }).success(function(result){
                //console.log(result);
                $scope.data.splice(index,1);
            });

        }
        $scope.limitdeleteCommodity=function(index){
            $http({
                method:'post',
                url:'http://localhost:8888/limitDeleteShoppingCar',
                data:{_id:$scope.limitData[index]._id}
            }).success(function(result){
                $scope.limitData.splice(index,1);
            });
        }
        $scope.moveCollect=function(index){
            console.log(index);

            $http({
                method:'post',
                url:'http://localhost:8888/moveCollect',
                data:{id:$scope.data[index].id,
                userName:getUser(),
                    price:$scope.data[index].price,
                commodityImages:$scope.data[index].commodityImages,
                 commodityTitle:$scope.data[index].commodityTitle,
                    limitState:true
                }
            }).success(function(result){
                $http({
                    method:'post',
                    url:'http://localhost:8888/deleteShoppingCar',
                    data:{_id: $scope.data[index]._id}
                }).success(function(result){
                    $scope.data.splice(index,1);
                });
            });
        }
        //$scope.ngQuantity=function(index){
        //
        //    var num=angular.element(document.querySelector('.purchaseNum'))[index].value;
        //    console.log(num);
        //    if(num==''){
        //        console.log(132);
        //        $scope.dd= parseInt($scope.data[index].commodityPrice[$scope.data[index].color]);
        //    }
        //    else {
        //        $scope.dd=num * parseInt($scope.data[index].commodityPrice[$scope.data[index].color]);
        //    }
        //}
}])

    //收货地址
    .controller('deliverAddressController',['$scope','$http','$location','$state','$document',function($scope,$http,$location,$state,$document){
        $scope.data='';
        $scope.single='';
        $http({
            method:'post',
            url:'http://localhost:8888/readDeliverAddress',
            data:{userName:getUser()}
        }).success(function(result){
            console.log(result);
            $scope.data=result;
        });
        $scope.editAddress=function(index){  //修改收货地址
            window.location='/#/myInformations/editAddress.html?'+$scope.data[index]._id;
        }
        $scope.deleteAddress=function(index){  //删除收货地址
            $http({
                method:'post',
                url:'http://localhost:8888/deleteAddress',
                data:{_id:$scope.data[index]._id}
            }).success(function(result){
                if(result){
                    $scope.data.splice(index,1);
                }
            }).error(function(err){
                console.log(err);
            });
        }
    }])
    //修改收货地址
    .controller('editrAddressController',['$scope','$http',function($scope,$http){
        $scope.single='';
        //console.log(window.location);
        var params= window.location.hash;
        var arr = params.substring(1).split("?")[1];
        //console.log( arr);
        //$scope.single=singleAddress.getAddress;
        //console.log( $scope.single);
        //
        //$(function() {
        //    $("#consigneeArea").citySelect({
        //        prov: $scope.single.deliverAddress[0],
        //        city: $scope.single.deliverAddress[1],
        //        dist: $scope.single.deliverAddress[2]
        //    });
        //});
        $http({
            method:'post',
            url:'http://localhost:8888/editAddress',
            data:{id:arr}
        }).success(function(result){
            //console.log(result);
            $scope.single=result;
                $("#consigneeArea").citySelect({
                    prov: $scope.single.deliverAddress[0],
                    city: $scope.single.deliverAddress[1],
                    dist: $scope.single.deliverAddress[2]
                });
        });
        //$scope.editAddress=function(index){
        //    $scope.single= $scope.data[index];
        //
        //
        //}
    }])
    //商品收藏
    .controller('commodityCollectionController',['$scope','$http',function($scope,$http){
        $scope.commoditys=[];
        $scope.limitcommoditys=[];
        $http({
            method:'post',
            url:'http://localhost:8888/showCollection',
            data:{userName:getUser()}
        }).success(function(result){
            for(var i=0;i<=result.length;i++){
                if(result[i].limitState==true){
                    $scope.commoditys.push(result[i]);
                }
                if(result[i].limitState==false){
                    $scope.limitcommoditys.push(result[i]);
                }
            }

        });
        $scope.detail=function(index){
            window.location='/#/purchasePage/commodityDetail.html?'+ $scope.commoditys[index].id;
        }
        $scope.limitdetail=function(index){
            window.location='/#/purchasePage/commodityDetail.html?'+ $scope.commoditys[index].id;
        }

    }])
    //社区
    .controller('communityController',['$scope','$http',function($scope,$http){
        $scope.result=[];
        $http({
            method:'post',
            url:'http://localhost:8888/community'
        }).success(function(result){
            console.log(typeof(result));
            $scope.result=result.reverse();//数组反转
            console.log($scope.result);
            //for(var j=0;j<$scope.result.length;j++){
            //    console.log(AnalyticEmotion('[呵呵]'));
            //    //$scope.result[j].content=AnalyticEmotion($scope.result[j].content);
            //    //console.log($scope.result[j].content);
            //}

        });
        //点赞
        $scope.clickSupport=function(index){
            console.log(index);
            $http({
                method:'post',
                url:'http://localhost:8888/clickSupport',
                data:{userName:getUser(),
               _id: $scope.result[index]._id}
            }).success(function(result){
                if(result){
                    $scope.result[index].support+=1;
                }
            });
        }
        //转发
        $scope.clickTurn=function(index){
            var newData=$scope.result[index];
            newData.userName=getUser();
            var date=new Date();
            var  timer=date.toLocaleDateString();
            var Min=date.getMinutes();
            if(Min<10){
                Min='0'+Min;
            }
            timer=timer+"/"+date.getHours()+":"+Min;
            newData.shareTime=timer;
            console.log(newData);
            $http({
                method:'post',
                url:'http://localhost:8888/clickTurn',
                data:newData
            }).success(function(result){
                if(result){
                    $scope.result[index].turnSend+=1;
                    console.log(typeof($scope.result));
                    $scope.result.unshift(newData);
                }
            });
        }
        //评论
        $scope.clickComment=function(index,event){
            $http({
                method:'post',
                url:'http://localhost:8888/clickComment',
                data:{
                    userName:getUser(),
                    commentText:$(event.target).prev().val(),
                    beId:$scope.result[index]._id
                }
            }).success(function(result){
               //console.log(result);
                $scope.result[index].commentContent.push(result);
                $(event.target).prev().val('');
            });
            console.log($(event.target).prev());
        }

    }])
        //将字符串解析成html标签
    //$sce是angularJS自带的安全处理模块，$sce.trustAsHtml(input)方法便是将数据内容以html的形式进行解析并返回。
    .filter('trustHtml', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    });
