(
    (label (# label "Label"))
    (button (# label "Button" onClick (lambda () (alert (# message "Thanks!")))))
    (textfield (# label "TextField" onChange (lambda ($arg) (alert (# message "$arg")))))
)

