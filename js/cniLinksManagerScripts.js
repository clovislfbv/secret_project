var $j = jQuery.noConflict();

// url = "http://10.236.64.67/wordpress_cni/wp-content/plugins/cni-link-manager/js/datatables/datatablesFR.json"  //Yann Version
url = "http://10.228.146.155/wordpress/wp-content/plugins/cni-link-manager/js/datatables/datatablesFR.json"  //Cloud Version

$j(document).ready(function () {

    /*** ******************************** ***/
    /*** Set up of all de datatable table ***/
    /*** ******************************** ***/

    $j('#cni-alllink-table').DataTable({
        "language": {
            "url": url
        },
        "columnDefs": [
            {
                target: 1,
                visible: false,
            },
        ],
        "order": [[1, 'desc']],
    });

    $j('#dead-links-table').DataTable({
        "language": {
            "url": url
        },
        "order": [[1, 'desc']],
    });

    $j('#cni-logs-table').DataTable({
        "language": {
            "url": url
        },
    });
    /*** ****************************************** ***/

    /*** ************************************* ***/
    /*** Set up the Modal Tag when it's opened ***/
    /*** ************************************* ***/

    $j(".cat-edit-btn").click(function (e) {
        e.preventDefault();
        $j("#currentId").val($j(this).attr('id').replace("edit-btn-", ""))
        let row = $j(this).closest("tr")
        let tagName = row.find(".tagName").text()

        //init input
        $j('#tagName').val(tagName)
    });

    /*** ******************************************** ***/

    /*** ****************************************** ***/
    /*** Set up the Modal Category when it's opened ***/
    /*** ****************************************** ***/

    $j(".cat-edit-btn").click(function (e) {
        e.preventDefault();
        $j("#currentId").val($j(this).attr('id').replace("edit-btn-", ""))
        let row = $j(this).closest("tr")
        let categoryName = row.find(".categoryName").text()

        //init input
        $j('#categoryName').val(categoryName)
    });

    /*** ********************************************** ***/
    /*** Set up the Modal Sub-category when it's opened ***/
    /*** ********************************************** ***/
    $j(".sub-cat-edit-btn").click(function (e) {
        e.preventDefault();
        $j("#currentId").val($j(this).attr('id').replace("edit-btn-", ""))
        let row = $j(this).closest("tr")
        let subCategoryName = row.find(".subCategoryName").text()

        //init input
        $j('#subCategoryName').val(subCategoryName)
    });
    /*** ********************************************** ***/

    /*** *********************************************** ***/
    /*** Set up the Modal Document-type when it's opened ***/
    /*** *********************************************** ***/
    $j(".doc-edit-btn").click(function (e) {
        e.preventDefault();
        $j("#currentId").val($j(this).attr('id').replace("edit-btn-", ""))
        let row = $j(this).closest("tr")
        let documentName = row.find(".documentName").text()

        //init input
        $j('#documentName').val(documentName)
    });
    /*** ********************************************** ***/

    /*** ********************************************** ***/
    /***         traitment to export a csv file         ***/
    /*** ********************************************** ***/

    let btns = $j(".btn_csv_export");
    let tables = $j("table");

    //loop through all buttons and find the
    $j.each(btns, function (key, value) {
        $j(value).insertAfter(tables[key]);
        $j(value).on("click", function (e) {
            exportTableToCSV($j(tables[key]).find("tr"), "userLogs" + key + 1);
        });
    });
    /*** ********************************************** ***/


    /*** ********************************************** ***/
    /*** Envoi de mail pour les liens morts ***/
    /*** ********************************** ***/

    $j(".deadLinkEmailSend").on("click", function (e) {
        $j("#liveToast").find(".note").html("");
        $j.ajax({
            type: "POST",
            url: "../wp-content/plugins/cni-link-manager/send-mail-dead-link.php",
            data: {linkId: this.id, emailUser: this.dataset.useremail, action: 'getDeadLink'},
            success: function (response) {
                if (response == 'ok') {
                    $j("#liveToast").find(".note").html('mail envoyé avec succès !');
                } else {
                    $j("#liveToast").find(".note").html('Une erreur est survenue lors de l\'envoi du message')
                }
                $j("#liveToast").toast("show");
            },
            error: function (err) {
                alert("Erreur ajax :" + err.responseText);
            }

        })
    })


    /*** ********************************** ***/
});


$j(window).load(function () {
    let regxAlphanumeric = ""
    let currentEditModalId

    /*** ************************************* ***/

    /*** Function check if an string URL is OK ***/
    /*** ************************************* ***/
    function validURL(str) {
        let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|)' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3})?' + // OR ip (v4) address
            '((\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*)?' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '((\\&?\\#?[-a-z\\d_=%\\[\\]]*)*)?$', 'i'); // fragment locator
        return !!pattern.test(str)
    }

    /*** ******************************************* ***/

    /*** Function check string empty or alphanumeric ***/
    /*** ******************************************* ***/
    function stringValidation(string) {
        return string.length > 0;
    }

    /*** ************************* ***/
    /*** Set up modal link edition ***/
    /*** ************************* ***/
    if (document.getElementById('linkEditionModal')) {
        let modal = document.getElementById('linkEditionModal')
        modal.addEventListener('show.bs.modal', function (event) {
            let button = event.relatedTarget
            let recipient = button.getAttribute('data-bs-whatever')
            let modalTitle = modal.querySelector('.modal-title')
            let modalBodyInput = modal.querySelector('.modal-body input')
            modalTitle.textContent = 'Edition du lien : ' + recipient
        })
    }

    /*** ********************* ***/
    /*** Ajax add new category ***/
    /*** ********************* ***/
    $j("#root_categorie_form").submit(function (e) {
        e.preventDefault();
        $j("#liveToast").find(".note").html("")
        let category = $j("#root-cat-name").val()

        if (stringValidation(category)) {
            let str = $j(this).serialize()
            $j.ajax({
                type: "POST",
                url: "../wp-content/plugins/cni-link-manager/categorie_form.php",
                data: str,
                success: function (returnMsg) {
                    if (returnMsg === "OK") {
                        $j("#liveToast").find(".note").html("L'ajout à été effectué avec succès")
                        location.reload()
                    } else {
                        $j("#liveToast").find(".note").html(returnMsg)
                    }
                }
            });
        } else {
            $j("#liveToast").find(".note").html("Veuillez entrer un nom valide")
        }
        $j("#liveToast").toast("show")
        $j("#root-cat-name").val("")
    });

    /*** ************************* ***/
    /*** Ajax add new sub category ***/
    /*** ************************* ***/
    $j("#sub_categorie_form").submit(function (e) {
        e.preventDefault()
        $j("#liveToast").find(".note").html("")
        let subcategory = $j("#sub-cat-name").val()

        if (stringValidation(subcategory)) {
            let str = $j(this).serialize()
            $j.ajax({
                type: "POST",
                url: "../wp-content/plugins/cni-link-manager/categorie_form.php",
                data: str,
                success: function (msg) {
                    if (msg === "OK") {
                        $j("#liveToast").find(".note").html("L'ajout à été effectué avec succès")
                        location.reload()
                    } else {
                        $j("#liveToast").find(".note").html(msg)
                    }
                }
            });
        } else {
            $j("#liveToast").find(".note").html("Veuillez entrer un nom valide")
        }
        $j("#liveToast").toast("show")
        $j("#sub-cat-name").val("")
    });

    /*** ************************** ***/
    /*** Ajax add new document type ***/
    /*** ************************** ***/
    $j("#document_type_form").submit(function (e) {
        e.preventDefault();
        $j("#liveToast").find(".note").html("")
        let documentType = $j("#addNewDocumentType").val()

        if (stringValidation(documentType) === true) {
            let str = $j(this).serialize()
            $j.ajax({
                type: "POST",
                url: "../wp-content/plugins/cni-link-manager/categorie_form.php",
                data: str,
                success: function (msg) {
                    if (msg === "OK") {
                        $j("#liveToast").find(".note").html("L'ajout à été effectué avec succès")
                        location.reload()
                    } else {
                        $j("#liveToast").find(".note").html(msg)
                    }
                }
            });
        } else {
            $j("#liveToast").find(".note").html("Veuillez entrer un nom valide")
        }
        $j("#liveToast").toast("show")
        $j("#addNewDocumentType").val("")
    });


    /*** ********************* ***/
    /*** Ajax add new CNI link ***/
    /*** ********************* ***/
    $j("#addNewCniLinkForm").submit(function (e) {
        e.preventDefault()
        $j("#liveToast").find(".note").html("")
        let category = $j('#categoryList').val()
        let subCategory = $j('#subCategoryList').val()
        let tagList = $j('#tagList').val()
        let documentType = $j('#documentTypeList').val()
        let documentName = $j('#documentName').val()
        let linkUrl = $j('#linkUrl').val()

        let ids = ['#categoryList', '#subCategoryList', '#tagList', '#documentTypeList', '#documentName', '#linkUrl']
        let arrayError = []
        let modalMsg = ""

        if (!category) {
            arrayError.push("Veuillez entrer une catégorie valide")
            $j('#categoryList').val("")
        }

        if (!subCategory) {
            arrayError.push("Veuillez entrer une sous-catégorie valide")
            $j('#subCategoryList').val("")
        }
        //
        // if (!tagList) {
        //     arrayError.push("Veuillez entrer un tag valide")
        //     $j('#tagList').val("")
        // }

        if (!documentType) {
            arrayError.push("Veuillez entrer un type de document valide")
            $j('#documentTypeList').val("")
        }

        if (!stringValidation(documentName)) {
            arrayError.push("Veuillez entrer un nom de document valide")
            $j('#documentName').val("")
        }

        if (!linkUrl) {
            arrayError.push("Veuillez entrer une URL valide")
            $j('#linkUrl').val("")
        }

        if (!validURL(linkUrl)) {
            arrayError.push("Veuillez entrer une URL valide")
            $j('#linkUrl').val("")
        }

        if (arrayError.length === 0) {
            let str = $j(this).serialize()
            $j.ajax({
                type: "POST",
                url: "../wp-content/plugins/cni-link-manager/cni_link_form.php",
                data: str,
                success: function (msg) {

                    if (msg == "OK") {
                        $j("#liveToast").find(".note").html("L'ajout à été effectué avec succès")
                    }
                    if (msg == "doublon") {
                        $j("#liveToast").find(".note").html("L'url est déjà référencée")
                    } else {
                        $j("#liveToast").find(".note").html(msg)
                    }
                }
            });
            resetForm(ids)
        } else {
            $j.each(arrayError, function (key, value) {
                modalMsg += value + "<br>"
            });
            $j("#liveToast").find(".note").html(modalMsg)
        }
        $j("#liveToast").toast("show")
    });

    /*** *********************************** ***/
    /*** Catch when the modal event is shown ***/
    /*** *********************************** ***/
    if (document.getElementById('linkEditionModal')) {
        let myModalEl = document.getElementById('linkEditionModal')
        myModalEl.addEventListener('hidden.bs.modal', function (event) {
            let id = ["#categoryList", "#subCategoryList", "#tagList", "#documentTypeList", "#documentName", "#linkUrl"]
            resetForm(id)
        })
    }

    setupModal();

    /*** ****************** ***/
    /*** Ajax Edit CNI link ***/
    /*** ****************** ***/
    $j("#updateCniLinkForm").submit(function (e) {
        e.preventDefault()
        $j("#liveToast").find(".note").html("")

        let category = $j('#categoryList').val()
        let subCategory = $j('#subCategoryList').val()
        let tagList = $j('#tagList').val()
        let documentType = $j('#documentTypeList').val()
        let documentName = $j('#documentName').val()
        let linkUrl = $j('#linkUrl').val()
        let currentId = $j('#currentId').val()
        let ids = ['#categoryList', '#subCategoryList', '#tagList', '#documentTypeList', '#documentName', '#linkUrl']

        let arrayError = []
        let modalMsg = ""

        if (!category) {
            arrayError.push("Veuillez entrer une catégorie valide")
            $j('#categoryList').val("")
        }

        if (!subCategory) {
            arrayError.push("Veuillez entrer une sous-catégorie valide")
            $j('#subCategoryList').val("")
        }

        // if (!tagList) {
        //     arrayError.push("Veuillez entrer un tag valide")
        //     $j('#tagList').val("")
        // }

        if (!documentType) {
            arrayError.push("Veuillez entrer un type de document valide")
            $j('#documentTypeList').val("")
        }

        if (!stringValidation(documentName)) {
            arrayError.push("Veuillez entrer un nom de document valide")
            $j('#documentName').val("")
        }

        if (!validURL(linkUrl)) {
            arrayError.push("Veuillez entrer une URL valide")
            $j('#linkUrl').val("")
        }

        if (arrayError.length === 0) {
            let str = $j(this).serialize()
            $j.ajax({
                type: "POST",
                url: "../wp-content/plugins/cni-link-manager/cni_link_form.php",
                data: str,
                success: function (msg) {
                    if (msg === "OK") {
                        $j("#liveToast").find(".note").html("Les modifications ont bien été enregistrées")
                        setTimeout(function () {
                            window.location.reload(1);
                        }, 700);
                    }
                    if (msg === "doublon") {
                        $j("#liveToast").find(".note").html("L'url est déjà référencée")
                    } else {
                        $j("#liveToast").find(".note").html(msg)
                    }
                }
            });
            resetForm(ids)
        } else {
            $j.each(arrayError, function (key, value) {
                modalMsg += value + "<br>"
            });
            $j("#liveToast").find(".note").html(modalMsg)
        }
        $j("#liveToast").toast("show")
    });


    if ($j('#allTableLinks').length) {
        $j(function () {
            $j('#allTableLinks').bootstrapTable()
        })
    }


    /*** ********************* ***/
    /*** Ajax add new tag ***/
    /*** ********************* ***/
    $j("#tags_manager_form").submit(function (e) {
        e.preventDefault();
        $j("#liveToast").find(".note").html("")
        let tag = $j("#tag-name").val()

        if (stringValidation(tag)) {
            let str = $j(this).serialize()
            $j.ajax({
                type: "POST",
                url: "../wp-content/plugins/cni-link-manager/tag_form.php",
                data: str,
                success: function (returnMsg) {
                    if (returnMsg === "OK") {
                        $j("#liveToast").find(".note").html("L'ajout à été effectué avec succès")
                        setTimeout(
                            function () {
                                window.location.reload(true);
                            }, 800);
                        //location.reload()
                    } else {
                        $j("#liveToast").find(".note").html(returnMsg)
                    }
                }
            });
        } else {
            $j("#liveToast").find(".note").html("Veuillez entrer un nom valide")
        }
        $j("#liveToast").toast("show")
        $j("#tag-name").val("")
    });
});

/*** Catch when the modal event tag is shown ***/
/*** ******************************************** ***/
if (document.getElementById('tagEditionModal')) {
    let myModalEl = document.getElementById('tagEditionModal')
    myModalEl.addEventListener('hidden.bs.modal', function (event) {
        let id = ["#tagName"]
        resetForm(id)
    })
}
/*** ******************************************** ***/

/*** Update Tags manager ***/
/*** ******************************************** ***/
function updateTag() {
    $j("#updateTagForm").submit(function (e) {
        e.preventDefault()
        $j("#liveToast").find(".note").html("")

        let tagName = $j('#tagName').val()
        let currentId = $j('#currentId').val()

        let arrayError = []
        let modalMsg = ""

        if (!stringValidation(tagName)) {
            arrayError.push("Veuillez entrer un tag valide")
            $j('#tagName').val("")
        }

        if (arrayError.length === 0) {
            $j.ajax({
                type: "POST",
                url: "../wp-content/plugins/cni-link-manager/tag_form.php",
                data: {currentId: currentId, action: 'updateTag', tagName: tagName},
                success: function (msg) {
                    if (msg === "OK") {
                        $j("#liveToast").find(".note").html("Les modifications ont bien été enregistrées")
                        setTimeout(function () {
                            window.location.reload(1);
                        }, 700);
                    } else {
                        $j("#liveToast").find(".note").html(msg)
                    }
                }
            });
        } else {
            $j.each(arrayError, function (key, value) {
                modalMsg += value + "<br>"
            });
            $j("#liveToast").find(".note").html(modalMsg)
        }
        $j("#liveToast").toast("show")
        $j("#tagName").val("")
    });
}

/*** ******************************************** ***/

/*** Delete Tag manager ***/
/*** ******************************************** ***/
function deleteTag(idTag, tagName) {
    let r = confirm("Êtes-vous sûr de vouloir supprimer le tag " + tagName + " ?");
    if (r) {
        jQuery.ajax({
            type: "POST",
            url: "../wp-content/plugins/cni-link-manager/tag_form.php",
            data: {idTag: idTag, tagName: tagName, action: 'deleteTag'},
            success: function (msg) {
                console.log("msg:", msg)
                if (msg === "OK") {
                    $j('#row_' + idTag).remove()
                    result = "Tag supprimée avec succès"
                } else {
                    result = msg
                }
                $j("#liveToast").toast("show")
                $j("#liveToast").find(".note").html(result)
            }
        });
    }
}

/*** ******************************************** ***/

/*** Remove a CNI link on the front and in the DB ***/
/*** ******************************************** ***/
function changeLinkState(idLink, active) {
    let r
    if (active === 1) {
        r = confirm("Êtes-vous sûr de vouloir activer le lien?");
    } else {
        r = confirm("Êtes-vous sûr de vouloir supprimer le lien?")
    }
    if (r) {
        jQuery.ajax({
            type: "POST",
            url: "../wp-content/plugins/cni-link-manager/cni_link_form.php",
            data: {idLink: idLink, active: active, action: 'changeLink'},
            success: function (msg) {
                jQuery("#note").ajaxComplete(function (event, request, settings) {
                    if (msg == "OK") {
                        $j('#row_' + idLink).remove()
                        result = "Modification effectuée avec succès"
                    } else {
                        result = msg
                    }
                    $j("#liveToast").toast("show")
                    $j("#liveToast").find(".note").html(result)
                });
            }
        });
    }
}

/*** ******************************************* ***/

/*** Function reset form element with the element id ***/
/*** *********************************************** ***/
function resetForm(array) {
    var i;
    for (i = 0; i < array.length; ++i) {
        $j(array[i]).val("")
    }
}

/*** ******************************************** ***/

/*** Delete a category on the front and in the DB ***/
/*** ******************************************** ***/
function deleteCategories(idCategory, catName) {
    let r = confirm("Êtes-vous sûr de vouloir supprimer cette catégorie?");
    if (r) {
        jQuery.ajax({
            type: "POST",
            url: "../wp-content/plugins/cni-link-manager/categorie_form.php",
            data: {idCategory: idCategory, catname: catName, action: 'deleteCat'},
            success: function (msg) {
                console.log("msg:", msg)
                if (msg === "OK") {
                    $j('#row_' + idCategory).remove()
                    result = "Catégorie supprimée avec succès"
                } else {
                    result = msg
                }
                $j("#liveToast").toast("show")
                $j("#liveToast").find(".note").html(result)
            }
        });
    }
}

/*** ******************************************** ***/
/*** Catch when the modal event category is shown ***/
/*** ******************************************** ***/
if (document.getElementById('catEditionModal')) {
    let myModalEl = document.getElementById('catEditionModal')
    myModalEl.addEventListener('hidden.bs.modal', function (event) {
        let id = ["#categoryName"]
        resetForm(id)
    })
}

/*** *************** ***/

/*** Update Category ***/
/*** *************** ***/
function updateCategory() {
    $j("#updateCategoryForm").submit(function (e) {
        e.preventDefault()
        $j("#liveToast").find(".note").html("")

        let categoryName = $j('#categoryName').val()
        let currentId = $j('#currentId').val()

        let arrayError = []
        let modalMsg = ""

        if (!stringValidation(categoryName)) {
            arrayError.push("Veuillez entrer une catégorie valide")
            $j('#categoryName').val("")
        }

        if (arrayError.length === 0) {
            $j.ajax({
                type: "POST",
                url: "../wp-content/plugins/cni-link-manager/cni_link_form.php",
                data: {currentId: currentId, action: 'updateCat', categoryName: categoryName},
                success: function (msg) {
                    if (msg === "OK") {
                        $j("#liveToast").find(".note").html("La modification ont bien été enregistrée")
                        location.reload()
                        setTimeout(function () {
                            window.location.reload(1);
                        }, 700);
                    } else {
                        $j("#liveToast").find(".note").html(msg)
                    }
                }
            });
        } else {
            $j.each(arrayError, function (key, value) {
                modalMsg += value + "<br>"
            });
            $j("#liveToast").find(".note").html(modalMsg)
        }
        $j("#liveToast").toast("show")
        $j("#categoryName").val("")
    });
}


/*** ************************************************ ***/

/*** Delete a sub-category on the front and in the DB ***/
/*** ************************************************ ***/
function deleteSubCategories(idSubCategory, subCategoryName) {
    let r = confirm("Êtes-vous sûr de vouloir supprimer cette catégorie?");
    if (r) {
        jQuery.ajax({
            type: "POST",
            url: "../wp-content/plugins/cni-link-manager/categorie_form.php",
            data: {idSubCategory: idSubCategory, action: 'deleteSubCat', subCategoryName: subCategoryName},
            success: function (msg) {
                jQuery("#note").ajaxComplete(function (event, request, settings) {
                    console.log("msg:", msg)
                    if (msg === "OK") {
                        $j('#row_' + idSubCategory).remove()
                        result = "Sous-catégorie supprimée avec succès"
                    } else {
                        result = msg
                    }
                    $j("#liveToast").toast("show")
                    $j("#liveToast").find(".note").html(result)
                });
            }
        });
    }
}

/*** ************************************************ ***/
/*** Catch when the modal event sub-category is shown ***/
/*** ************************************************ ***/
if (document.getElementById('subCatEditionModal')) {
    let myModalEl = document.getElementById('subCatEditionModal')
    myModalEl.addEventListener('hidden.bs.modal', function (event) {
        let id = ["#subCategoryName"]
        resetForm(id)
    })
}

/*** ******************* ***/

/*** Update Sub-Category ***/
/*** ******************* ***/
function updateSubCategory() {
    $j("#updateSubCategoryForm").submit(function (e) {
        e.preventDefault()
        $j("#liveToast").find(".note").html("")

        let subCategoryName = $j('#subCategoryName').val()
        let currentId = $j('#currentId').val()

        let arrayError = []
        let modalMsg = ""

        if (!stringValidation(subCategoryName)) {
            arrayError.push("Veuillez entrer une sous-catégorie valide")
            $j('#subCategoryName').val("")
        }

        if (arrayError.length === 0) {
            $j.ajax({
                type: "POST",
                url: "../wp-content/plugins/cni-link-manager/cni_link_form.php",
                data: {currentId: currentId, action: 'updateSubCat', subCategoryName: subCategoryName},
                success: function (msg) {
                    if (msg === "OK") {
                        $j("#liveToast").find(".note").html("Les modifications ont bien été enregistrées")
                        location.reload()
                        setTimeout(function () {
                            window.location.reload(1);
                        }, 700);
                    } else {
                        $j("#liveToast").find(".note").html(msg)
                    }
                }
            });
        } else {
            $j.each(arrayError, function (key, value) {
                modalMsg += value + "<br>"
            });
            $j("#liveToast").find(".note").html(modalMsg)
        }
        $j("#liveToast").toast("show")
        $j("#subCategoryName").val("")
    });
}

/*** ************************************************* ***/

/*** Delete a document-link on the front and in the DB ***/
/*** ************************************************* ***/
function deleteDocumentLink(idDocumentLink, linkTypeName) {
    let r = confirm("Êtes-vous sûr de vouloir supprimer ce type de document?");
    if (r) {
        jQuery.ajax({
            type: "POST",
            url: "../wp-content/plugins/cni-link-manager/categorie_form.php",
            data: {idDocumentLink: idDocumentLink, action: 'deleteDocLink', linkTypeName: linkTypeName},
            success: function (msg) {
                console.log("msg:", msg)
                if (msg === "OK") {
                    $j('#row_' + idDocumentLink).remove()
                    result = "Type de document supprimé avec succès"
                } else {
                    result = msg
                }
                $j("#liveToast").toast("show")
                $j("#liveToast").find(".note").html(result)
            }
        });
    }
}

/*** ******************************************** ***/
/*** Catch when the modal event category is shown ***/
/*** ******************************************** ***/
if (document.getElementById('docLinkEditionModal')) {
    let myModalEl = document.getElementById('docLinkEditionModal')
    myModalEl.addEventListener('hidden.bs.modal', function (event) {
        let id = ["#documentName"]
        resetForm(id)
    })
}

/*** ******************** ***/

/*** Update Document-Link ***/
/*** ******************** ***/
function updateDocumentLink() {
    $j("#updateDocumentLinkForm").submit(function (e) {
        e.preventDefault()
        $j("#liveToast").find(".note").html("")

        let documentName = $j('#documentName').val()
        let currentId = $j('#currentId').val()

        let arrayError = []
        let modalMsg = ""

        if (!stringValidation(documentName)) {
            arrayError.push("Veuillez entrer un type de document valide")
            $j('#documentName').val("")
        }

        if (arrayError.length === 0) {
            $j.ajax({
                type: "POST",
                url: "../wp-content/plugins/cni-link-manager/cni_link_form.php",
                data: {currentId: currentId, action: 'updateDoc', documentName: documentName},
                success: function (msg) {
                    if (msg === "OK") {
                        $j("#liveToast").find(".note").html("Les modifications ont bien été enregistrées")
                        location.reload()
                        setTimeout(function () {
                            window.location.reload(1);
                        }, 700);
                    } else {
                        $j("#liveToast").find(".note").html(msg)
                    }
                }
            });
        } else {
            $j.each(arrayError, function (key, value) {
                modalMsg += value + "<br>"
            });
            $j("#liveToast").find(".note").html(modalMsg)
        }
        $j("#liveToast").toast("show")
        $j("#documentName").val("")
    });
}

/*** ***************** ***/

/*** ***************** ***/
/*** export csv * Yama ***/
/*** ***************** ***/

function exportTableToCSV(tablerRows, filename) {
    let csv = [];

    for (let i = 0; i < tablerRows.length; i++) {
        let row = [],
            cols = tablerRows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);
        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

/*** ********************************* ***/

/*** ********************************* ***/

/*** Set up the Modal when it's opened ***/
/*** ********************************* ***/
function setupModal() {
    $j(".editBtn").click(function (e) {
        e.preventDefault();
        $j("#currentId").val($j(this).attr('id'))
        let row = $j(this).closest("tr")
        let category = row.find(".category").text()
        let parsedSubCategory = JSON.parse(row.find(".subCategory").text())
        let parsedTag
        row.find(".tagList").text() ? parsedTag = JSON.parse(row.find(".tagList").text()) : parsedTag = null
        let documentType = row.find(".documentType").text()
        let documentName = row.find(".documentName").text()
        let direction = row.find(".userName").text()
        let Datelink = row.find(".dateLink").text()
        let url = row.find(".url").text()

        console.log('ligne html: ', row)
        console.log('categorie:', category)
        // console.log('type de doc: ',documentType.toLowerCase())

        //init input
        $j('#documentName').val(documentName)
        $j('#linkUrl').val(url)
        $j('#currentLink').val(url)

        //init select list

        for (let j = 0; j < category.length; ++j) {
            $j("#categoryList").find("option").filter(function () {
                return this.innerHTML.toLowerCase() === category.toLowerCase()
            }).attr("selected", true)
        }


        for (let i = 0; i < parsedSubCategory.length; ++i) {
            $j("#subCategoryList").find("option").filter(function () {
                return this.innerHTML.toLowerCase() === parsedSubCategory[i].toLowerCase()
            }).attr("selected", true)
        }

        if (parsedTag != null) {
            for (let tagCounter = 0; tagCounter < parsedTag.length; ++tagCounter) {
                $j("#tagList").find("option").filter(function () {
                    return this.innerHTML.toLowerCase() === parsedTag[tagCounter].toLowerCase()
                }).attr("selected", true)
            }
        }

        for (let k = 0; k < documentType.length; ++k) {
            $j("#documentTypeList").find("option").filter(function () {
                return this.innerHTML.toLowerCase() === documentType.toLowerCase()
            }).attr("selected", true)
        }
    });
}

function orderByName() {
    $j("#userNameLink").click(function (e) {
        e.preventDefault();
    })
};
/*** ********************************** ***/

