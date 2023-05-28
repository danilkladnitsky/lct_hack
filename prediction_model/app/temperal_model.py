from torch import nn


class TemporalNet(nn.Module):
    def __init__(self, num_inputs, num_outputs):
        super(TemporalNet, self).__init__()
        self.layer_1 = nn.Linear(num_inputs, num_outputs)

    def forward(self, x):
        return self.layer_1(x)
